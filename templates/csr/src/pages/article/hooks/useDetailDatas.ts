import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import MarkLink from "markdown-it-link-attributes";
import http from "helper/http";

export default function useDetailDatas() {
  const state = reactive({
    basic: {
      title: "",
      status: "",
      watch: 0,
      like: 0,
      collect: 0,
      coms: 0,
      quote: "",
    },
    detail: "",
    form: {},
    passLoading: false,
    denyLoading: false,
  });
  let articleId: string | string[] = "";
  const {
    params: { id },
  } = useRoute();
  articleId = id;
  function fetchDetail() {
    if (!articleId) {
      ElMessage.warning("缺少专栏id");
      return;
    }
    http
      .get(`/article/detail?id=${articleId}`)
      .then((res: any) => {
        const {
          title,
          state: status,
          ctime,
          mtime,
          watch,
          like,
          detail,
          uploader,
          cate,
          tag,
          collect,
          coms,
          quote,
        } = res;
        // 基础资料
        state.basic = {
          title,
          status,
          watch,
          like,
          collect,
          coms,
          quote,
        };
        // 运营资料
        state.form = {
          title,
          ctime,
          mtime,
          uploader,
          cate,
          tag,
        };
        const md = new MarkdownIt({
          html: true,
          highlight: (str: string, lang: string) => {
            if (lang && hljs.getLanguage(lang)) {
              return `<pre><div class="hljs"><code>${
                hljs.highlight(lang, str, true).value
              }</code></div></pre>`;
            }
            return `<pre><div class="hljs"><code>${md.utils.escapeHtml(
              str
            )}</code></div></pre>`;
          },
        }).use(MarkLink, {
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        });
        state.detail = md.render(detail);
      })
      .catch(() => {});
  }
  return {
    state,
    articleId,
    fetchDetail,
  };
}
