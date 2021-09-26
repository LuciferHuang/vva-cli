import { CascarderConfig } from "components/casCard/index";
import { Option } from "helper/types";
import { InputConfig } from "components/smartBox/index";
import { OptionConfig } from "components/selectBox/index";

declare interface FormRuleItem {
  required?: boolean;
  min?: number;
  max?: number;
  message: string;
  trigger: string;
}

declare interface FormRule {
  prop: Array<FormRuleItem>;
}

declare interface FormConfig extends InputConfig, CascarderConfig {
  defaultVal?: any;
  all?: boolean;
  rules?: Array<FormRule>;
  ext?: any;
  multiple?: boolean;
  filterable?: boolean;
  options?: Array<Option>;
  optionConfig?: OptionConfig;
}

export declare interface FormItem {
  prop: string;
  label: string;
  renderType: string;
  placeholder?: string;
  hide?: boolean;
  readonly?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  config?: FormConfig;
  tip?: string;
}