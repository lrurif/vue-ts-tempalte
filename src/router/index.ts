import { createRouter, createWebHashHistory} from "vue-router"
import login from "../views/login/index.vue"
// const NotFound = resolve => require(['pages/errorPage/404'], resolve);
// const Forbidden = resolve => require(['pages/errorPage/403'], resolve);
import empty from "../views/empty/index.vue"
import Layout from "../views/Layout/index.vue"
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
/* 准备动态添加的路由 */
export const DynamicRoutes = [
  {
      path: '',
      component: Layout,
      name: 'container',
      redirect: '/',
      meta: {
          requiresAuth: true,
          name: '首页'
      },
      children: [
          {
              path: '/',
              component: empty,
              name: 'home',
              meta: {
                  name: '首页',
                  icon: 'icon-home'
              }
          }, 
          //dynamic-router文件里面内容会放在此处
      ]
  },
  // {
  //     path: '/403',
  //     component: Forbidden
  // },
  // {
  //     path: '*',
  //     component: NotFound
  // }
];