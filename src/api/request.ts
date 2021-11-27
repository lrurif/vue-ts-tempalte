import axios from "axios";
import store from "@/store/index.ts"
// import { Message } from "element-puls";
let cancel;
let whiteUrlList = []
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
  return res.data;
})
export default service;
