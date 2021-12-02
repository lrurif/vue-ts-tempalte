import router from "./index";
import store from "../store/index";
const routesWhiteList = ["login"];
router.beforeEach((to: any, from, next) => {
  console.log(store.state.permission.menuList, 'menuList');
  // debugger;
  console.log(sessionStorage.getItem("token"), 'token');
  if (routesWhiteList.includes(to.name)) {
    next();
  } else if (!sessionStorage.token) {
    next({
      name: "login",
    });
  } else if (!store.state.permission.menuList) {
    store.dispatch("setPermissionList").then(() => {
        next({ ...to });
    });
  } else if (to.name != "login") {
    next();
  }
});

router.afterEach((to) => {
  const routerList = to.matched;
  to.meta.params = to.params;
  to.meta.query = to.query;
  const nameList = routerList.map((v, i) => {
    if (v.meta && v.meta.name) {
      return {
        link: v.name,
        name: v.meta.name,
      };
    }
  });
  store.commit("setCrumbList", nameList.filter(Boolean));
  console.log(store.state, '---->');
  sessionStorage.setItem('store', JSON.stringify(store.state));
});
export default router;
