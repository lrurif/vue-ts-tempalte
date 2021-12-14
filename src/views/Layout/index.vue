<template>
  <div>
    <div class="layout-header">
      <div class="header-img">
        <img
          src="https://gateway.iuctrip.com/manage/iuctrip-manage-web/static/img/login.5d451ac.png"
        />
      </div>
      <div class="header-right">
        <el-dropdown>
          <div class="user-info">
            <img
              src="https://oss.iuctrip.com/waishiyouchuan/default_avatar.png"
              class="avatar"
            />
            <span class="user-name">
              超级管理员
              <el-icon color="#fff" class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <main class="main">
      <div class="left-area">
        <sidebarNav :menuData="leftMunuList" a="123"></sidebarNav>
      </div>
      <div class="right-area">
        <top-aside></top-aside>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { ArrowDown } from "@element-plus/icons";
import { mapState, useStore } from "vuex";
import { computed } from "vue";
import sidebarNav from "./components/sidebar-nav.vue";
import topAside from "./components/top-aside.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    ArrowDown,
    sidebarNav,
    topAside,
  },
  setup() {
    let store = useStore();
    const router = useRouter();
    const leftMunuList = computed(() => store.state.permission.leftMunuList);
    const isSidebarNavCollapse = computed(
      () => store.state.permission.isSidebarNavCollapse
    );
    const loginOut = () => {
      store.dispatch("LOGIN_OUT")
    };
    return {
      leftMunuList,
      isSidebarNavCollapse,
      loginOut,
    };
  },
};
</script>
<style scoped lang="scss">
.layout-header {
  height: 50px;
  background-color: #212844;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .header-img {
    width: 122px;
    height: 22px;
  }
  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      .user-name {
        margin-left: 10px;
        color: #fff;
      }
      i {
        color: #fff;
      }
    }
    .avatar {
      width: 30px;
      height: 30px;
    }
  }
}
.main {
  display: flex;
  height: calc(100vh - 50px);
  align-items: center;
  justify-content: space-between;
  & > div {
    height: 100%;
  }
  .left-area {
    background-color: #212844 !important;
    overflow: hidden;
  }
  .right-area {
    flex: 1;
  }
}
</style>
