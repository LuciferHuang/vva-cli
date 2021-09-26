import { renderToString } from "vue/server-renderer";
import { createApp } from "./entry";

export async function render(
  url: string,
  manifest: { [key: string]: string[] }
) {
  const { app, router, store } = createApp();

  router.push(url);
  await router.isReady();

  const to = router.currentRoute;
  const matchedRoute = to.value.matched;
  if (to.value.matched.length === 0) {
    return "";
  }

  const matchedComponents: any = [];
  matchedRoute.map((route) => {
    matchedComponents.push(...Object.values(route.components));
  });

  const asyncDataFuncs = matchedComponents.map((component: any) => {
    const asyncData = component.asyncData || null;
    if (asyncData) {
      const config = {
        store,
        route: to,
        env: process.env.NODE_ENV,
      };
      return asyncData(config);
    }
  });

  await Promise.all(asyncDataFuncs);

  const context: any = {};
  const appHtml = await renderToString(app, context);
  const state = store.state;

  const preloadLinks =
    process.env.NODE_ENV === "production"
      ? renderPreloadLinks(context.modules, manifest)
      : [];
  return { appHtml, state, preloadLinks };
}

function renderPreloadLinks(modules: any, manifest: any) {
  let links = "";
  const seen = new Set();
  modules.forEach((id: string) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file: string) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return "";
  }
}
