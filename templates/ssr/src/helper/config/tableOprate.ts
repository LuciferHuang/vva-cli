import { OperateBtn } from "components/tableOprate";

export const common: OperateBtn[] = [
  {
    cmd: "copy",
    label: "批量复制ID",
    position: "left",
    plain: true,
    icon: "DocumentCopy",
  },
  {
    cmd: "add",
    label: "新建文章",
    position: "right",
    type: "primary",
    icon: "Plus",
  },
];
