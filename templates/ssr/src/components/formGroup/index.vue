<template>
  <el-form
    ref="elForm"
    class="form-group"
    :label-width="`${labelWidth}px`"
    :model="state.form"
    :rules="state.rules"
    :size="size"
    :inline="inline"
  >
    <el-form-item
      v-for="item in formItems"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      v-show="!item.hide"
    >
      <el-input
        v-if="item.renderType === 'input'"
        v-model="state.form[item.prop]"
        :placeholder="item.placeholder || '请输入'"
        clearable
        :disabled="!!item.readonly"
        v-bind="(item.config || { ext: {} }).ext"
        @input="changeHandle"
      >
      </el-input>
      <el-checkbox-group
        v-else-if="item.renderType === 'checkbox'"
        v-model="state.form[item.prop]"
        clearable
        :disabled="!!item.readonly"
        @input="changeHandle"
      >
        <el-checkbox
          v-for="check in (item.config || {}).options || []"
          :key="check.value"
          :label="check.value"
        >
          {{ check.label }}
        </el-checkbox>
      </el-checkbox-group>
      <el-radio-group
        v-else-if="item.renderType === 'radio'"
        v-model="state.form[item.prop]"
        :disabled="!!item.readonly"
        @input="changeHandle"
      >
        <el-radio
          v-for="radio in (item.config || {}).options || []"
          :key="radio.value"
          :label="radio.value"
        >
          {{ radio.label }}
        </el-radio>
      </el-radio-group>
      <select-box
        v-else-if="item.renderType === 'select'"
        v-model="state.form[item.prop]"
        :multiple="(item.config || {}).multiple"
        :placeholder="item.placeholder || '请选择'"
        :filterable="(item.config || {}).filterable"
        :all="(item.config || {}).all"
        :readonly="!!item.readonly"
        :options="(item.config || {}).options || []"
        :optionConfig="(item.config || {}).optionConfig"
        @input="changeHandle"
      />
      <smart-box
        v-else-if="item.renderType === 'smartbox'"
        v-model="state.form[item.prop]"
        :config="item.config"
        :placeholder="item.placeholder || '请选择'"
        :multiple="(item.config || {}).multiple"
        :disabled="!!item.readonly"
        @input="changeHandle"
      />
      <cas-carder
        v-else-if="item.renderType === 'cascard'"
        v-model="state.form[item.prop]"
        :config="item.config"
        :disabled="!!item.readonly"
      />
      <el-popover
        v-if="item.tip"
        class="question"
        popper-class="question-popover"
        placement="right"
        trigger="hover"
        :content="item.tip"
      >
        <template #reference>
          <i class="el-icon-warning-outline"></i>
        </template>
      </el-popover>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
  ElPopover,
} from "element-plus";
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import { objDeepCopy } from "helper/utils";
import smartBox from "components/smartBox/index.vue";
import selectBox from "components/selectBox/index.vue";
import casCarder from "components/casCard/index.vue";
import { ComponentSize } from "helper/types";
import { FormItem, FormRule } from ".";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElCheckboxGroup,
    ElCheckbox,
    ElRadioGroup,
    ElRadio,
    ElPopover,
    smartBox,
    selectBox,
    casCarder,
  },
  props: {
    labelWidth: { type: Number, default: 80 },
    formItems: { type: Array as PropType<FormItem[]>, default: () => [] },
    size: { type: String as PropType<ComponentSize>, default: "" },
    inline: { type: Boolean, default: false },
    modelValue: { default: () => ({}) },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    let state = reactive({
      form: {},
      rules: {},
    });
    watch(
      () => props.modelValue,
      (val) => {
        state.form = val;
        Object.keys(val).length === 0 && initDefaultVal();
      }
    );
    // 手动触发校验
    const elForm = ref<typeof ElForm | null>(null);
    function validate(args) {
      return elForm.value.validate(args);
    }
    // 初始化
    function init() {
      state.form = props.modelValue;
      initRules();
      initDefaultVal();
    }
    // 初始化规则
    function initRules() {
      state.rules = {};
      props.formItems.forEach((item) => {
        const {
          required,
          prop,
          renderType,
          label,
          minLength,
          maxLength,
          config,
        } = item;
        const { rules: configRules = [] } = config || {};
        const { prop: propRule = [] } = state.rules as FormRule;
        // 初始化校验规则
        if (required) {
          propRule.push({
            required: true,
            message: `请${renderType === "input" ? "输入" : "选择"}${label}`,
            trigger: "blur",
          });
        }
        if (minLength || maxLength) {
          let message = "";
          if (minLength && maxLength) {
            message = `请输入${minLength}到${maxLength}个字`;
          } else if (minLength && !maxLength) {
            message = `请至少输入${minLength}个字`;
          } else {
            message = `最多只能输入${minLength}个字`;
          }
          propRule.push({
            min: minLength || 0,
            max: maxLength || Infinity,
            message,
            trigger: "blur",
          });
        }
        if (propRule.length > 0 || configRules.length > 0) {
          state.rules[prop] = [...propRule, ...configRules];
        }
      });
    }
    // 初始化默认值
    function initDefaultVal() {
      props.formItems.forEach((item) => {
        const { prop, renderType, config } = item;
        const { defaultVal, multiple } = config || {};
        if (defaultVal) {
          let result = objDeepCopy(defaultVal);
          switch (renderType) {
            case "select":
            case "smartbox":
              if (multiple && !Array.isArray(result)) {
                result = [result];
              }
              break;
            default:
              break;
          }
          state.form[prop] = result;
        }
      });
    }
    init();
    function changeHandle() {
      emit("update:modelValue", state.form);
    }
    return {
      elForm,
      state,
      changeHandle,
      validate,
    };
  },
});
</script>
<style lang="scss">
.form-group {
  user-select: none;
  .el-form-item {
    margin-bottom: 18px;
    .question {
      margin-left: 3px;
    }
    .el-radio-group,
    .el-checkbox-group {
      width: 340px;
      display: inline-block;
    }
  }
  .el-input,
  .el-input .el-input__inner {
    width: 340px;
  }
}
.admin .question-popover {
  padding: 8px 12px;
}
</style>
