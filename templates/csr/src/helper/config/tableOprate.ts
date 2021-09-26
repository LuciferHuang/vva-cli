import { OperateBtn } from "components/tableOprate";

export const common: OperateBtn[] = [
  {
    cmd: "copy",
    label: "批量复制ID",
    size: "small",
    position: "left",
    plain: true,
    icon: "el-icon-document-copy",
  },
  {
    cmd: "add",
    label: "新建文章",
    size: "small",
    position: "right",
    type: "primary",
    icon: "el-icon-plus",
  },
];
