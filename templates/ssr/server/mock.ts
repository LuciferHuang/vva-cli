const Koa = require("koa");
const durationMiddleware = require("./api/response_duration");
const headerMiddleware = require("./api/response_header");
const dataMiddleware = require("./api/response_data");
const cors = require("koa-cors");

const app = new Koa();

app
  .use(durationMiddleware)
  .use(headerMiddleware)
  .use(dataMiddleware)
  .use(cors());

app.listen(7777, () => {
  const { successBox: tip } = require("./utils/formatting");
  process.stdout.write(tip("后台运行在：localhost:7777"));
});
