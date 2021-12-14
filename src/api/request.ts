import axios from "axios";
import store from "@/store"
import { ElMessage } from 'element-plus'
let cancel;
let whiteUrlList:Array<string> = []
const service = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
service.interceptors.request.use((config: any) => {
  config.headers["token"] = store.state.permission.token;
  if(whiteUrlList.includes(config.url)) {
    return config;
  }
  config.cancelToken = new axios.CancelToken((c) => {
    cancel = c;
  });
  return config;
});
service.interceptors.response.use((res) => {
  res => {
    if (res.status === 200) {
        if (res.data.success === false) {
            if (res.data) {
                ElMessage.closeAll();
                ElMessage.error({
                    message: res.data.err_msg ? res.data.err_msg : res.data.message
                });
            }
            if (res.data !== undefined && res.data.code !==undefined && res.data.code === '19995') {
                setTimeout(() => {
                    store.dispatch('LOGIN_OUT');
                }, 1000);
            }
            return Promise.reject(res);
        }
        return res.data;
    }
    return Promise.reject(res);
},
err => {
    if (axios.isCancel(err)) {
        console.log('request cancel ', JSON.stringify(err));
        return Promise.reject(err);
    }
    store.dispatch('general/STARTLOADING',false);
    if (err && err.response) {
        switch (err.response.status) {
        case 400:
            err.message = '请求出错';
            break;
        case 401:
            ElMessage.warning({
                message: '授权失败，请重新登录'
            });
            store.dispatch('permission/LOGIN_OUT');
            return;
        case 403:
            err.message = '拒绝访问';
            break;
        case 404:
            err.message = '请求错误,未找到该资源';
            break;
        case 500:
            err.message = '服务器端出错';
            break;
        default:
            err.message = 'error';
        }
    } else {
        err.message = '连接服务器失败';
    }
    ElMessage.error({
        message: err.message
    });
    return Promise.reject(err);
}
})
export default service;
