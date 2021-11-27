<template>
  <template v-for="item in menuData" :key="item.path">
    <template v-if="item.name != 'home'">
      <el-sub-menu
        v-if="
          item.children && item.children.some((item) => item?.meta?.permission)
        "
        :index="item.name"
        :data-a="item.name"
        :key="item.name"
      >
        <template #title>
          <el-icon><Location /></el-icon>
          <span>{{ item.meta.name }}</span>
        </template>
        <dynamic-menu :menuData="item.children"></dynamic-menu>
      </el-sub-menu>
      <el-menu-item :key="item.name" :data-a="item.name" v-else :index="item.name" @click="gotoRoute(item)">
        <el-icon><Location /></el-icon>
        <span>{{ item.meta.name }}</span>
      </el-menu-item>
    </template>
  </template>
</template>
<script lang="ts">
import { Location } from "@element-plus/icons";
import { useRouter } from "vue-router";
export default {
  name: "dynamic-menu",
  components: {
    Location,
  },
  props: {
    menuData: {
      type: Array,
    },
  },
  setup(props) {
    console.log(props.menuData);
    const router = useRouter();
    const gotoRoute = (item: any) => {
      console.log(item);
      router.push({
        name: item.name,
      });
    };
    return {
      gotoRoute,
    };
  },
};
</script>
