import overview from "@/pages/overview/index.vue";
import overviewBasic from "@/pages/overview/basic.vue";
import article from "@/pages/article/index.vue";
import articleList from "@/pages/article/list.vue";
import articleDetail from "@/pages/article/detail.vue";

const homeRoutes = [
  {
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
