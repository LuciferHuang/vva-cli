import { readdirSync, readFileSync } from "fs";

const getJsonData = (module: string) => {
  const dir = `./mock${module ? `/${module}` : ""}`;
  const fileJson = readdirSync(dir);
  const results = {};
  fileJson.forEach((fileName) => {
    try {
      const fileData = readFileSync(`${dir}/${fileName}`, "utf-8");
      const datas = JSON.parse(fileData.replace(/\n|\s+/g, ""));
      results[fileName.replace(/\.json/g, "")] = datas;
    } catch (error) {
      console.error("文件读取失败", error);
    }
  });
  return results;
};

const assetJson = (module: string) => {
  const temp = [];
  const datas = getJsonData(module);
  Object.keys(datas).forEach((key) => {
    const { method = "get", response } = datas[key];
    temp.push({
      url: `/mock/${module}/${key}`,
      method,
      response: () => {
        return response;
      },
    });
  });
  return temp;
};

const {
  list: {
    response: {
      data: { list: cateList },
    },
  },
} = getJsonData("cate") as any;
const {
  list: {
    response: {
      data: { list: tagList },
    },
  },
} = getJsonData("tag") as any;

export default [
  {
    url: "/mock/cate/list",
    response: ({ query }) => {
      const { text: queryText = "", pid: queryPid = "" } = query;
      if (queryText) {
        const target = cateList.find(({ text }) => text.includes(queryText));
        if (target) {
          return {
            code: "0",
            msg: "success",
            data: {
              total: 1,
              list: [target],
            },
          };
        }
      }
      if (queryPid) {
        const target = cateList.find(({ pid }) => pid == queryPid);
        if (target) {
          return {
            code: "0",
            msg: "success",
            data: {
              total: 1,
              list: [target],
            },
          };
        }
      }
      return {
        code: "0",
        msg: "success",
        data: {
          total: 4,
          list: cateList,
        },
      };
    },
  },
  {
    url: "/mock/tag/list",
    response: ({ query }) => {
      const { id: queryId = "" } = query;
      if (queryId) {
        const target = tagList.find(({ id }) => id == queryId);
        if (target) {
          return {
            code: "0",
            msg: "success",
            data: {
              total: 1,
              list: [target],
            },
          };
        }
      }
      return {
        code: "0",
        msg: "success",
        data: {
          total: 3,
          list: tagList,
        },
      };
    },
  },
  ...assetJson("article"),
  ...assetJson("user"),
  ...assetJson("statistics"),
];
