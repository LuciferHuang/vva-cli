import { ref } from "vue";
import { ElMessage } from "element-plus";
import http from "helper/http";

/**
 * <新建|编辑>弹窗功能
 * @param {Function} loadData - 加载表格数据回调
 */
export default function useDialogFeature(loadData: Function) {
  let diaVisible = ref(false);
  let diaLoading = ref(false);
  let editId = ref("");
  // 弹窗确认
  function diaConfirmHandle(form) {
    confirmRequest(form, !!editId.value);
  }
  function confirmRequest(params, isEdit: boolean) {
    console.log('咋了')
    diaLoading.value = true;
    const url = isEdit ? "/cate/update" : "/cate/update";
    http
      .post(url, params)
      .then(() => {
        diaLoading.value = false;
        ElMessage.success("操作成功");
        diaVisible.value = false;
        loadData();
      })
      .catch(() => {
        diaLoading.value = false;
      });
  }
  // 弹窗关闭
  function diaCloseHandle() {
    diaVisible.value = false;
    editId.value = "";
  }
  return {
    diaLoading,
    diaVisible,
    editId,
    diaConfirmHandle,
    diaCloseHandle,
  };
}
