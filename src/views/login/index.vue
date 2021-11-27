<template>
  <el-row class="login-forms">
    <div class="login-bottom-img">
      <img :src="`${API_HOST_INGBASEURL}login_bg.png`" />
    </div>
    <el-col class="login-right">
      <div class="login-right-btn">
        <div style="padding: 50px 20px 0">
          <img :src="`${API_HOST_INGBASEURL}login_bg1.png`" width="480" />
        </div>
        <el-form
          :model="formData"
          status-icon
          ref="ruleForm2"
          class="demo-ruleForm login-form"
        >
          <el-form-item>
            <div style="text-align: center; font-size: 22px">登录</div>
          </el-form-item>
          <el-form-item prop="username" class="li-input">
            <img
              src="https://kybcrm-files.oss-cn-hangzhou.aliyuncs.com/prod/tesla/smart-scenic-v2-web/images/name.png"
              alt=""
              class="login-name"
            />
            <el-input
              type="name"
              placeholder="请输入用户名"
              v-model="formData.username"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="li-input">
            <img
              src="https://kybcrm-files.oss-cn-hangzhou.aliyuncs.com/prod/tesla/smart-scenic-v2-web/images/password.png"
              alt=""
              class="login-pass"
            />
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="formData.password"
              auto-complete="off"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <p style="margin-bottom: 20px">
            <el-checkbox v-model="checked">记住用户名</el-checkbox>
            <a
              style="
                float: right;
                font-weight: 400;
                color: #999;
                margin-right: 0;
              "
              >账号注册</a
            >
          </p>
          <el-form-item>
            <button class="btn" :disabled="loading" @click="login">
              {{ loading ? "登录中..." : "登录" }}
            </button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="24">
      <div
        style="
          text-align: center;
          color: #aaaaaa;
          position: fixed;
          bottom: 4vh;
          left: 45vw;
        "
      >
        <p>浙公网备案33010502003988号</p>
        <p>
          网站备案/许可证号:
          <a
            style="text-decoration: none; color: #aaa"
            href="http://beian.miit.gov.cn"
            target="_blank"
            >浙ICP15016618号-2</a
          >
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { reactive, toRefs, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    let { proxy } = getCurrentInstance();
    let data: any = reactive({
      API_HOST_INGBASEURL: proxy.$root.API_HOST_INGBASEURL,
      formData: {
        username: "",
        password: "",
      },
      checked: false,
      loading: false,
    });
    const login = () => {
      store.dispatch("setPermissionList", [1, 101, 102]).then(() => {
        sessionStorage.token = "123231fadfs"
        store.commit("setToken", "123231fadfs")
        setTimeout(() => {
          router.push({
            name: "userList",
          });
        });
      });
    };
    return {
      ...toRefs(data),
      login,
    };
  },
};
</script>

<style scoped>
/* .login-forms{
  height: 100vw;
  height: 100vh;
  background: url('') no-repeat 100% 100%;
   */
/* } */
.btn {
  width: 80%;
  margin-left: 10%;
  background: rgba(33, 40, 68, 1);
  box-shadow: 0px 7px 27px 2px rgba(82, 132, 242, 0.21);
  border-radius: 32px;
  height: 40px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 172, 33, 1);
  text-shadow: 0px 7px 27px rgba(57, 68, 174, 0.36);
  cursor: pointer;
}
.login-bottom-img {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.login-bottom-img > img {
  width: 100%;
  height: 100%;
}
.login-forms :deep(.el-input__suffix) {
  display: none;
}

.img-url {
  position: absolute;
  right: 0.5vw;
  bottom: 2px;
  /* margin-top: -4.5vh; */
  /* height: 4vh; */
  cursor: pointer;
}

.login-form {
  width: 300px;
  margin: 0;
}

.login-left {
  padding: 29px 45px 0px;
}

.login-bottom-img {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.login-bottom-img > img {
  width: 100%;
  height: 100%;
}

.login-top-img {
  text-align: left;
}

.login-top-img > img {
  width: 10vw;
}

.login-right {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-right-btn {
  border-radius: 3px;
  border: 1px solid #ece9e9;
  background: #fff;
  padding: 23px 38px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  margin: 0;
  padding: 0;
}

.login-forms :deep(.el-form-item__content) {
  position: relative;
}

.login-name,
.login-pass {
  position: absolute;
  width: 17px;
  height: 18px;
  z-index: 200;
  left: 0.4vw;
  margin-top: 10px;
}

.validator-num {
  position: relative;
}

.validator-data {
  position: absolute;
  right: 33px;
  top: 0;
  display: inline-block;
  width: 93px;
  height: 32px;
  line-height: 32px;
  background: #e9ecf3;
  color: #417ff6;
  margin: 4px;
}

.login-forms .el-form-item,
.el-button--primary {
  width: 100%;
}

/* .login-forms >>> .el-form-item{ */
/*  margin-left:16px*/
/* } */
.login-forget {
  line-height: 20px;
}

.login-forms :deep(.el-form-item__error) {
  left: 35px;
}

.login-forms :deep(.el-input__inner) {
  padding-left: 25px;
}

.login-forms :deep(.el-form-item.is-success .el-input__inner) {
  border-color: #417ff6;
}

.login-forms :deep(.el-form-item.is-success .el-input__validateIcon) {
  color: #417ff6;
}
.li-input {
  display: inline-block;
}
</style>
