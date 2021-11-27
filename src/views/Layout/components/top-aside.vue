<template>
  <aside class="aside__top">
    <span
      class="icon iconfont iconshousuocaidan toggleNavCollapse"
      :class="{ active: isSidebarNavCollapse }"
      @click="toggleNavCollapse"
    >
    </span>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <template v-for="(route, i) in crumbList">
          <el-breadcrumb-item
            v-if="route.link != 'container'"
            :key="route.link"
            :to="{ name: route.link }"
            :class="{ 'is-last-link': i == crumbList.length - 1 }"
          >
            <span></span>
            {{ route.name }}
          </el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </aside>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const toggleNavCollapse = () => {
      store.commit("toggleNavCollapse");
    };
    const crumbList = computed(() => store.state.permission.crumbList);
    const isSidebarNavCollapse = computed(() =>store.state.permission.isSidebarNavCollapse);
    return {
      crumbList,
      isSidebarNavCollapse,
      toggleNavCollapse,
    };
  },
};
</script>
<style scoped lang="scss">
.aside__top {
  border-bottom: 1px solid #e5e5e5;
  height: 50px;
  line-height: 50px;
  background: #fff;
  z-index: 1000;
  transition: left 0.25s;
  position: relative;
  .el-breadcrumb {
    display: inline-block;
    position: relative;
  }
  .toggleNavCollapse {
    display: inline-block;
    margin-left: 8px;
    padding: 0 10px;
    font-size: 20px;
    vertical-align: middle;
    color: #333;
    cursor: pointer;
    transition: all 0.5s;
    &.active {
      transform: rotate(180deg);
    }
  }
}
.breadcrumb-enter,
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.6s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-leave-active {
  position: absolute;
  left: 100%;
  white-space: nowrap;
}
</style>
