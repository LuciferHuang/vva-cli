const fs = require("fs");
const path = require("path");

const express = require("express");
const { createServer: createViteServer } = require("vite");

const Koa = require("koa");
const staticPath = require("koa-static");

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const isProd = process.env.NODE_ENV === "production";

const root = process.cwd();
const resolve = (p: string) => path.resolve(__dirname, p);

async function createServer() {
  if (isProd) {
    // production
    const app = new Koa();

    const template = fs.readFileSync(
      resolve("../dist/client/index.html"),
      "utf-8"
    );
    const manifest = require("../dist/client/ssr-manifest.json");
    const render = require("../dist/server/entry-server.js").render;

    app.use(staticPath(resolve("../dist/client"), { index: false }));

    app.use(async (ctx: any, next: any) => {
      const url = ctx.req.url;
      try {
        const { appHtml, state, preloadLinks } = await render(url, manifest);

        const html = template
          .replace(`'<!--vuex-state-->'`, JSON.stringify(state))
          .replace(`<!--preload-links-->`, preloadLinks)
          .replace("<!--title-->", state.route.meta.title || "<%= name %>")
          .replace(`<!--ssr-outlet-->`, appHtml);

        ctx.body = html;
      } catch (error) {
        console.log(error);
        next();
      }
    });

    return { app };
  }
  // development
  const app = express();
  const vite = await createViteServer({
    root,
    logLevel: isTest ? "error" : "info",
    server: {
      middlewareMode: "ssr",
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
      },
    },
  });
  app.use(vite.middlewares);
  app.use("*", async (req: any, res: any) => {
    // serve index.html - we will tackle this next
    const url = req.originalUrl;
    try {
      // 1. Read index.html
      let template = fs.readFileSync(resolve("../index.html"), "utf-8");
      // 2. Apply vite HTML transforms.
      template = await vite.transformIndexHtml(url, template);
      // 3. Load the server entry. vite.ssrLoadModule
      const { render } = await vite.ssrLoadModule(
        "/src/framework/entry-server.ts"
      );
      // 4. render the app HTML.
      const { appHtml, state } = await render(url);
      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`'<!--vuex-state-->'`, JSON.stringify(state))
        .replace("<!--title-->", state.route.meta.title || "<%= name %>")
        .replace(`<!--ssr-outlet-->`, appHtml);
      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      const error = e as Error;
      // If an error is caught,
      vite.ssrFixStacktrace(error);
      console.error(error);
      res.status(500).end(error.message);
    }
  });
  return { app, vite };
}

if (!isTest) {
  const { showBanner } = require("./utils/banner");
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      showBanner(isProd, { host: "localhost", port: "3000" });
    })
  );
}
