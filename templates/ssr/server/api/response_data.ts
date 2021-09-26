const path = require("path");
const fs = require("fs");

module.exports = async (ctx, next) => {
  const url = ctx.request.url;
  let [filePath] = url.replace("/mock", "").split("?");
  filePath = path.join(__dirname, "data", ...`${filePath}.json`.split("/"));
  try {
    const fileStr = fs.readFileSync(filePath, "utf-8");
    const fileJson = JSON.parse(fileStr);
    ctx.response.body = fileJson;
  } catch (error) {
    const errorMsg = {
      msg: "文件解析失败或不存在",
      code: "500",
      data: error,
    };
    ctx.response.body = JSON.stringify(errorMsg);
  }
  await next();
};
