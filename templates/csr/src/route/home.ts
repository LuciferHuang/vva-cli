const overview = () => import("@/pages/overview/index.vue");
const overviewBasic = () => import("@/pages/overview/basic.vue");
const article = () => import("@/pages/article/index.vue");
const articleList = () => import("@/pages/article/list.vue");
const articleDetail = () => import("@/pages/article/detail.vue");

const homeRoutes = [
  {
    name: "view",
    path: "view",
    component: overview,
    redirect: "/home/view/basic",
    children: [
      {
        path: "basic",
        component: overviewBasic,
      },
    ],
  },
  {
    name: "article",
    path: "article",
    component: article,
    redirect: "/home/article/list",
    children: [
      {
        path: "list",
        component: articleList,
      },
      {
        path: "detail/:id",
        component: articleDetail,
      },
    ],
  },
];

export default homeRoutes;
