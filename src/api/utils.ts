
import request from "./request"
export const handleUrl =  (actionName:string) => {
  let baseUrl = import.meta.env.VITE_BASE_URL;
  let serverName = '/foreign-ship-service/';
  return baseUrl + serverName + actionName;
};
/**
* 
* @param {Object} urlArr 路径对象
* @param {Array} getArr get请求路径数组
* @returns {Function[]} 数组请求函数
*/
export const handleRequestFunc = (urlArr: string[], getArr:Array<string>) => {
 const requestMap:any = {};
 Object.keys(urlArr).map(item => {
     requestMap[item.replace(/Url$/, "Api")]= (params:any) => {
         let requestObj:any = {
             url: handleUrl(urlArr[item]),
             method: 'post',
             data: params
         };
         if (getArr.includes(item)) {
           requestObj.method = 'get';
           requestObj.params = params
           delete requestObj.data;
         }
         return request(requestObj);
     };
 });
 return requestMap;
}