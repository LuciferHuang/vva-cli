<template>
  <filter-group
    :filters="filterFormItems"
    v-model="state.form"
    @search="loadData"
  ></filter-group>
  <panel class="mg-t-18">
    <el-affix :offset="88">
      <table-oprate
        class="mg-b-12"
        :button-grop="tableOprates"
        @trigger="batchHandle"
      ></table-oprate>
    </el-affix>
    <page-table
      selectable
      :table-config="tableConfig"
      :datas="state.tableData"
      :all-items="state.allItems"
      :filter-map="filterMap"
      @selected="selectHandle"
      @sort-change="sortHandle"
      @page="pageHandle"
      @operate="operateHandle"
    >
    </page-table>
  </panel>
  <add-edit-dia
    :visible="diaVisible"
    :id="editId"
    :form-items="diaFormItems"
    :data-path="dataPath"
    :data-url="diaDataUrl"
    :loading="diaLoading"
    @confirm="diaConfirmHandle"
    @close="diaCloseHandle"
  ></add-edit-dia>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted } from "vue";
// 组件
import { ElAffix } from "element-plus";
// 配置
import useConfig from "./hooks/useListConfig";
// 表格功能
import useTableFeature from "./hooks/useListTable";
// 弹窗功能
import useDialogFeature from "./hooks/useListDialog";

export default defineComponent({
  components: {
    ElAffix,
    filterGroup: defineAsyncComponent(
      () => import("components/filterGroup/index.vue")
    ),
    tableOprate: defineAsyncComponent(
      () => import("components/tableOprate/index.vue")
    ),
    pageTable: defineAsyncComponent(
      () => import("components/pageTable/index.vue")
    ),
    panel: defineAsyncComponent(() => import("components/panel/index.vue")),
    addEditDia: defineAsyncComponent(
      () => import("components/addEditDia/index.vue")
    ),
  },
  setup() {
    // 表格功能
    const tableFeature = useTableFeature(tableAddHandle, tableEditHandle);
    const { loadData } = tableFeature;
    // 弹窗功能
    const dialogFeature = useDialogFeature(loadData);
    function tableAddHandle() {
      dialogFeature.diaVisible.value = true;
    }
    function tableEditHandle(id: number | string) {
      dialogFeature.editId.value = `${id}`;
      dialogFeature.diaVisible.value = true;
    }
    loadData();
    // 供模板使用
    return {
      ...useConfig(), // 引入配置
      ...tableFeature,
      ...dialogFeature,
    };
  },
});
</script>
<style lang="scss">
</style>
