<template>
  <el-dialog
    custom-class="common-dialog"
    :title="id ? '编辑' : '新建'"
    v-model="diaFormVisible"
    width="490px"
    @close="dialogClose"
  >
    <form-group
      ref="diaFormGroup"
      :formItems="formItems"
      v-model="diaFormProxy.form"
      size="small"
      :labelWidth="66"
    ></form-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" type="primary" :loading="loading" @click="comfirmHandler"
          >确 定</el-button
        >
        <el-button size="small" @click="diaFormVisible = false"
          >取 消</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import formGroup from "components/formGroup/index.vue";
import { FormItem } from "components/formGroup/index";
import { cusToRefs, parseValueByPath } from "helper/utils";
import http from "helper/http";

export default defineComponent({
  components: {
    formGroup,
  },
  props: {
    formItems: { type: Array as PropType<FormItem[]>, default: () => [] },
    dataPath: { type: String, default: "" },
    dataUrl: { type: String, default: "" },
    visible: { type: Boolean, default: false },
    id: { type: String, default: "" },
    loading: { type: Boolean, default: false },
  },
  emits: ["confirm", "close"],
  setup(props, { emit }) {
    let diaFormVisible = ref(false);
    let diaFormProxy = reactive({
      form: {},
    });

    watch(
      () => props.visible,
      (val) => {
        diaFormVisible.value = val;
        if (val) {
          fetchData();
        }
      },
      { immediate: true }
    );

    function fetchData() {
      const { id, dataPath, dataUrl } = props;
      if (id) {
        http
          .get(`${dataUrl}${id}`)
          .then((res) => {
            [diaFormProxy.form] = parseValueByPath(res, dataPath);
          })
          .catch(() => {});
      }
    }
    const diaFormGroup = ref<typeof formGroup | null>(null);
    function comfirmHandler() {
      diaFormGroup.value.validate((valid: boolean) => {
        if (valid) {
          emit("confirm", cusToRefs(diaFormProxy.form));
        }
      });
    }
    function dialogClose() {
      emit("close");
      diaFormProxy.form = {};
    }
    return {
      diaFormVisible,
      diaFormProxy,
      diaFormGroup,
      comfirmHandler,
      dialogClose,
    };
  },
});
</script>
<style lang="scss">
.common-dialog {
  .el-dialog__header {
    padding: 10px 20px;
    border-bottom: 1px solid #888888;
    .el-dialog__headerbtn {
      top: 15px;
    }
  }
  .el-dialog__footer {
    padding: 10px 20px;
    border-top: 1px solid #888888;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>