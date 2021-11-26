<script lang="ts">
import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      let data:any = reactive({
        API_HOST_INGBASEURL: ''
      })
      data.API_HOST_INGBASEURL = 'https://kybcrm-files.oss-cn-hangzhou.aliyuncs.com/prod/tesla/davinci-merchant-web/images/'
      return {
        ...toRefs(data)
      }

    }
  }
</script>

<template>
  <router-view/>
</template>
<style>
  html, body {
    height: 100%;
    overflow: auto;
  }
  #app {
    height: 100vh;
    overflow: hidden;
  }
  #app>div {
    height: calc(100% - 50px);
    overflow: hidden;
  }
</style>