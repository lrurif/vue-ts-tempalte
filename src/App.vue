<script lang="ts">
import { reactive, toRefs, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import axios from "axios"
export default {
  setup() {
    axios.get("/api/user").then(res => {
      console.log(res);
    })
    const store = useStore();
    // 在页面加载时读取sessionStorage
    // if (sessionStorage.getItem("store")) {
    //   store.replaceState(
    //     Object.assign(
    //       {},
    //       store.state,
    //       JSON.parse(sessionStorage.getItem("store"))
    //     )
    //   );
    //   sessionStorage.removeItem("store");
    // }

    let data: any = reactive({
      API_HOST_INGBASEURL: "",
    });
    data.API_HOST_INGBASEURL =
      "https://kybcrm-files.oss-cn-hangzhou.aliyuncs.com/prod/tesla/davinci-merchant-web/images/";
    return {
      ...toRefs(data),
    };
  },
};
</script>

<template>
  <router-view />
</template>
<style>
html,
body {
  height: 100%;
  overflow: auto;
}
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
