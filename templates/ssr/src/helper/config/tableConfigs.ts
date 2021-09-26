import { ColumnConfig } from "components/tableView";

export const article: ColumnConfig[] = [
  {
    prop: "id",
    label: "专栏ID",
    plugins: ["copy"],
  },
  {
    prop: "title",
    label: "标题",
    plugins: ["copy"],
  },
  {
    prop: "poster",
    label: "封面",
    type: "slot",
  },
  {
    prop: "cate",
    label: "类型",
    plugins: ["translate"],
    config: {
      translate: {
        url: "/cate/list?psize=10&pindex=1&id=",
        dataPath: "list",
        dataKey: "text",
      },
    },
  },
  {
    prop: "status",
    label: "状态",
    plugins: ["filter"],
  },
  {
    prop: "watch",
    label: "阅读量",
    sortable: true,
    config: {
      sortParam: "sort",
      orderParam: "order",
      sortVal: "read",
      ascVal: "asc",
      descVal: "desc",
    },
  },
  {
    prop: "like",
    label: "点赞数",
    sortable: true,
    config: {
      sortParam: "sort",
      orderParam: "order",
      sortVal: "like",
      ascVal: "asc",
      descVal: "desc",
    },
  },
  {
    prop: "uploader",
    label: "作者",
  },
  {
    prop: "ctime",
    width: 102,
    label: "创建时间",
    sortable: true,
    config: {
      sortParam: "sort",
      orderParam: "order",
      sortVal: "ctime",
      ascVal: "asc",
      descVal: "desc",
    },
  },
  {
    prop: "mtime",
    width: 102,
    label: "修改时间",
    sortable: true,
    config: {
      sortParam: "sort",
      orderParam: "order",
      sortVal: "mtime",
      ascVal: "asc",
      descVal: "desc",
    },
  },
  {
    type: "operation",
    label: "操作",
    operates: [
      {
        cmd: "edit",
        label: "编辑",
      },
      {
        cmd: "detail",
        label: "详情",
      },
    ],
  },
];

