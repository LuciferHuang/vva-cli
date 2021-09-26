import { FilterItem } from "components/filterGroup";

export const common: FilterItem[] = [
  {
    renderType: "input",
    label: "ID",
    prop: "id",
  },
  {
    renderType: "input",
    label: "标题",
    prop: "title",
  },
  {
    renderType: "select",
    label: "状态",
    prop: "status",
    options: [
      {
        value: 1,
        label: "待审核",
      },
      {
        value: 2,
        label: "审核通过",
      },
      {
        value: 3,
        label: "审核拒绝",
      },
      {
        value: 4,
        label: "已删除",
      },
    ],
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
      defaultParam: { type: 1, pindex: 1, psize: 20 },
    },
  },
  {
    label: "创建时间",
    prop: "ctimeRange",
    renderType: "datepicker",
    config: {
      type: "datetimerange",
    },
  },
  {
    label: "修改时间",
    prop: "mtimeRange",
    renderType: "datepicker",
    config: {
      type: "datetimerange",
    },
  },
];
