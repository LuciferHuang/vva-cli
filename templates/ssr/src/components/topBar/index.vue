<template>
  <header class="top-bar">
    <div class="heade-left" @click="toIndex()">
      <span class="el-icon-watermelon"></span>
      <span class="mg-l-8">Platform</span>
    </div>
    <div class="heade-right">
      <div class="heade-user">
        <el-popover
          popper-class="user-popover"
          placement="bottom"
          trigger="hover"
        >
          <div class="quit" @click="quitLogin">退出登录</div>
          <template #reference>
            <span class="text" v-if="userInfor.name">
              <i class="el-icon-s-custom mg-r-8"></i>
              {{ userInfor.name }}
            </span>
            <span class="text" v-else> 请先登录 </span>
          </template>
        </el-popover>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ElPopover } from "element-plus";
import { delCookie, getCookie } from "helper/utils";
import { USER_INFOR_KEY, USER_TOKEN_KEY } from "config/others";
import { UserInfor } from ".";

export default defineComponent({
  components: {
    ElPopover,
  },
  setup() {
    let userInfor: UserInfor;
    try {
      const cookieStr = getCookie(USER_INFOR_KEY);
      userInfor = JSON.parse(cookieStr) || {};
    } catch (error) {
      console.error(error);
    }
    function toIndex() {
      location.href = "/home";
    }
    function quitLogin() {
      delCookie(USER_TOKEN_KEY);
      delCookie(USER_INFOR_KEY);
      const { host } = location;
      location.href = `//${host}/login`;
    }
    return {
      userInfor,
      toIndex,
      quitLogin,
    };
  },
});
</script>
<style lang='scss'>
.top-bar {
  width: 100%;
  height: 70px;
  line-height: 70px;
  background: #373d41;
  color: #fff;
  user-select: none;
  z-index: 30;
  .heade-left {
    margin-left: 8px;
    height: 70px;
    float: left;
    font-weight: 666;
    font-size: 28px;
    .el-icon-watermelon {
      font-size: 32px;
      vertical-align: middle;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .heade-right {
    float: right;
    height: 70px;
    font-size: 16px;
    display: flex;
    align-items: center;
    svg {
      cursor: pointer;
    }
    .heade-user {
      padding: 0 28px;
      border-left: 1px solid #2a2f32;
      border-right: 1px solid #2a2f32;
    }
  }
}
.user-popover {
  text-align: center;
  padding: 12px 0;
  .quit {
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
