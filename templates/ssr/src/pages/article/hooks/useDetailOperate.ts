import http from "helper/http";
import { ElMessageBox } from "element-plus";

export default function useDetailOperate(articleId, state) {
  function back() {
    window.history.back();
  }
  function passHandle() {
    state.passLoading = true;
    operateReq(2);
  }
  function denyHandle() {
    ElMessageBox.prompt("请输入拒绝理由", "Deny Tip", {
      confirmButtonText: "提交",
      cancelButtonText: "取消",
    })
      .then(({ value }) => {
        state.denyLoading = true;
        operateReq(3, value);
      })
      .catch(() => {});
  }
  function operateReq(cmd: number, remark = "") {
    http
      .post("/article/update", {
        id: articleId,
        state: cmd,
        remark,
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        state.passLoading = false;
        state.denyLoading = false;
      });
  }
  return {
    back,
    passHandle,
    denyHandle,
  }
}