<template>
  <router-view />
</template>
<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    ElMessage.warning({
      showClose: true,
      duration: 5186,
      message: "elementUI 的 popover 在 ssr 下有问题，修复工作进行中",
    });
  },
});
</script>
