<template>
  <el-select
    placeholder="请选择"
    v-for="index in state.chain.length + 1"
    :key="index"
    class="mg-r-8"
    :disabled="disabled"
    v-model="state.chain[index - 1]"
    @change="selectChange(index - 1, $event)"
    v-show="state.options[index - 1] && state.options[index - 1] != -1"
  >
    <el-option
      v-for="obj in state.options[index - 1] || []"
      :key="obj.id"
      :label="obj.name"
      :value="obj.id"
    ></el-option>
  </el-select>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";
import { ElSelect, ElOption } from "element-plus";
import http from "helper/http";
import { CascarderConfig } from "./index";

export default defineComponent({
  components: {
    ElSelect,
    ElOption,
  },
  props: {
    modelValue: { default: () => [], required: true },
    config: { type: Object as PropType<CascarderConfig>, required: true },
    all: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit }) {
    const state = reactive({
      chain: [],
      options: [],
    });
    watch(() => props.modelValue, initByValue);
    async function init() {
      await loadRoot();
      initByValue();
    }
    async function loadRoot() {
      const { rootUrl, httpMethod } = props.config as CascarderConfig;
      const data = await http[httpMethod](rootUrl);
      resultHandle(true, data);
    }
    function initByValue() {
      const { modelValue } = props;
      if (modelValue && Object.keys(modelValue).length > 0) {
        if (state.chain?.length > 0) {
          return;
        }
        state.chain = modelValue;
        loadChild(0);
      }
    }
    function loadChild(chainIndex) {
      const parentId = state.chain[chainIndex];
      if (parentId === -1) {
        return;
      }
      const { childUrl, httpMethod } = props.config as CascarderConfig;
      const url = `${childUrl}${parentId}`;
      http[httpMethod](url)
        .then((data) => {
          resultHandle(false, data);
        })
        .catch(() => {});
    }
    function resultHandle(isRoot: boolean, data) {
      const { rootPath, childPath, idKey, nameKey } = props.config as CascarderConfig;
      let nodes = [];
      if (isRoot) {
        nodes = data[rootPath];
      } else {
        nodes = data[childPath];
      }
      const results = (nodes || []).map((ele) => ({
        id: ele[idKey],
        name: ele[nameKey],
      }));
      if (results.length > 0) {
        if (props.all) {
          results.unshift({
            name: "全部",
            id: -1,
          });
        }
        state.options.push(results);
      }
    }
    function selectChange(index, value) {
      if (value !== -1) {
        emit("update:modelValue", state.chain);
        emit("change", state.chain);
      }
      state.chain.splice(index + 1, state.chain.length);
      state.options.splice(index + 1, state.options.length);
      loadChild(state.chain.length - 1);
    }
    init();
    return {
      state,
      selectChange,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
