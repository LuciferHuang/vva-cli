import { FormItem } from "components/formGroup";

export const addEdit: FormItem[] = [
  {
    prop: "title",
    label: "标题",
    renderType: "input",
    required: true,
  },
  {
    prop: "status",
    label: "状态",
    renderType: "radio",
    required: true,
    config: {
      defaultVal: 1,
      options: [
        {
          value: 1,
          label: "可用",
        },
        {
          value: 2,
          label: "不可用",
        },
      ],
    },
  },
  {
    prop: "cate",
    label: "类型",
    renderType: "smartbox",
    config: {
      method: "get",
      searchKey: "text",
      targetPath: "list",
      nameKey: "text",
      idKey: "id",
      url: "/cate/list",
      defaultParam: { pindex: 1, psize: 20 },
    },
  },
];
