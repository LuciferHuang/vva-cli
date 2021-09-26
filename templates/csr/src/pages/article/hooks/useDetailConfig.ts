import { FormItem } from "components/formGroup";

export default function useDetailConfig() {
  const formItems: FormItem[] = [
    {
      prop: "title",
      label: "标题",
      renderType: "input",
      readonly: true,
    },
    {
      prop: "cate",
      label: "类型",
      renderType: "cascard",
      readonly: true,
      config: {
        rootUrl: "/cate/list?pindex=1&psize=20",
        childUrl: "/cate/list?pindex=1&psize=20&pid=",
        httpMethod: "get",
        rootPath: "list",
        childPath: "list",
        idKey: "id",
        nameKey: "text",
      },
    },
    {
      prop: "tag",
      label: "标签",
      renderType: "smartbox",
      readonly: true,
      config: {
        multiple: true,
        method: "get",
        searchKey: "text",
        targetPath: "list",
        nameKey: "text",
        idKey: "id",
        url: "/tag/list",
        defaultParam: { pindex: 1, psize: 20 },
      },
    },
    {
      prop: "mtime",
      label: "修改时间",
      renderType: "input",
      readonly: true,
    },
    {
      prop: "ctime",
      label: "创建时间",
      renderType: "input",
      readonly: true,
    },
    {
      prop: "uploader",
      label: "作者",
      renderType: "input",
      readonly: true,
    },
  ];
  return {
    formItems,
  };
}
