export const DEFAULT_PAGE_SIZE = 20;
export const USER_INFOR_KEY = "vva_user_info";
export const USER_TOKEN_KEY = "vva_user_token";
export const LANG_KEY = "vva_language_token";

export const navList = [
  {
    text: "overview.name",
    icon: "el-icon-s-marketing",
    path: "/home/view",
    children: [
      {
        text: "overview.basic",
        path: "/home/view/basic",
      },
    ],
  },
  {
    text: "article.name",
    icon: "el-icon-notebook-2",
    path: "/home/article",
  },
];
