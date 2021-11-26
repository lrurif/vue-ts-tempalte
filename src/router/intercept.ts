import router from "./index"
const routesWhiteList = ['login']
router.beforeEach((to:any, from ,next) => {
  // if(!sessionStorage.token && !routesWhiteList.includes(to.name)) {
  //   next({
  //     path: '/login'
  //   });
  // }
  next();
})
export default router;