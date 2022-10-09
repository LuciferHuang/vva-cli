<template>
  <panel>
    <i class="detail-head el-icon-arrow-left" @click="back"></i>
    <span class="detail-title">{{ state.basic.title }}</span>
    <div class="mg-t-12">
      状态：
      <span
        :style="`font-weight:bold;color:${styleFilter(state.basic.status)}`"
        >{{ statusFilter(state.basic.status) }}</span
      >
    </div>
    <div class="mg-t-12">
      <span class="mg-r-12">阅读量：{{ formateNum(state.basic.watch) }} </span>
      <span class="mg-r-12">点赞数：{{ formateNum(state.basic.like) }}</span>
      <span class="mg-r-12">收藏：{{ formateNum(state.basic.collect) }} </span>
      <span>评论：{{ formateNum(state.basic.coms) }} </span>
    </div>
    <div v-if="state.basic.quote" class="mg-t-12">
      原文链接：<a
        :href="state.basic.quote"
        target="_blank"
        rel="noopener noreferrer"
        >{{ state.basic.quote }}</a
      >
    </div>
  </panel>
  <panel title="专栏资料">
    <form-group
      ref="diaFormGroup"
      inline
      :formItems="formItems"
      v-model="state.form"
      size="small"
      :labelWidth="80"
    ></form-group>
  </panel>
  <panel title="专栏内容" :plugins="['collapse']">
    <div class="detail-content" v-html="state.detail"></div>
  </panel>
  <el-affix position="bottom" :offset="0">
    <panel top-shadow class="btn-group">
      <el-button
        type="success"
        :disabled="`${state.basic.status}` == '2'"
        :loading="state.passLoading"
        @click="passHandle"
        >通 过</el-button
      >
      <el-button
        type="danger"
        :disabled="`${state.basic.status}` == '3'"
        :loading="state.denyLoading"
        @click="denyHandle"
        >拒 绝</el-button
      >
    </panel>
  </el-affix>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import useDetailConfig from "./hooks/useDetailConfig";
import useDetailDatas from "./hooks/useDetailDatas";
import useDetailFilter from "./hooks/useDetailFilter";
import useDetailOperate from "./hooks/useDetailOperate";

export default defineComponent({
  components: {
    formGroup: defineAsyncComponent(
      () => import("components/formGroup/index.vue")
    ),
    panel: defineAsyncComponent(
      () => import("components/panel/index.vue")
    ),
  },
  setup() {
    const { state, fetchDetail, articleId } = useDetailDatas();
    fetchDetail();
    return {
      state,
      ...useDetailConfig(),
      ...useDetailFilter(),
      ...useDetailOperate(articleId, state),
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/styles/detail.scss";
</style>
