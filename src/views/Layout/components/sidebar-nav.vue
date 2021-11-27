<template>
  <el-menu
    active-text-color="#ffd04b"
    text-color="#ccc"
    :collapse="isSidebarNavCollapse"
    background-color="#212844"
    class="el-menu-vertical"
    :default-active="navselected"
    @select="selectItems"
  >
    <dynamic-menu :menuData="menuData"></dynamic-menu>
  </el-menu>
</template>
<script lang="ts">
import dynamicMenu from "./dynamic-menu.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
    import { ref } from "vue"

export default {
  components: {
    dynamicMenu,
  },
  props: {
    menuData: {
      type: Array,
    },
    a: {},
  },
  setup() {
    const store = useStore();
    const isSidebarNavCollapse = computed(
      () => store.state.permission.isSidebarNavCollapse
    );
    const navselected = computed(() => store.state.permission.navselected)
    const selectItems = (selectItems:any) => {
      console.log("navselected.value");
      store.commit('SETVALUE',{
            key:'navselected',
            value:selectItems
        });
    }
    return {
      isSidebarNavCollapse,
      navselected,
      selectItems
      // menuData: props.menuData
    };
  },
};
</script>
<style scoped lang="scss">
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: none;
}
.el-menu-vertical {
  overflow: hidden;
}
::v-deep(.el-menu-item) {
  background-color: #12172e !important;
}
</style>
