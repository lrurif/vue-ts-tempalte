import router, { DynamicRoutes } from "../../router/index";
import permissionRoutes from "../../router/dynamic-router.js";
import store from "../index"
const state = {
  token: null,
  menuList: null,
  leftMunuList: [],
  permissionList: [],
  /* 导航栏是否折叠 */
  isSidebarNavCollapse: false,
  /* 面包屑导航列表 */
  crumbList: [],
  navselected: ''
};
const mutations = {
  SETVALUE(state: any, params:any) {
      state[params.key] = params.value;
  },
  setToken(state: any, token: string) {
    state.token = token;
  },
  setMenuList(state: any, menuList: any) {
    state.menuList = menuList;
  },
  setLeftMenuList(state: any, leftMunuList: any) {
    state.leftMunuList = leftMunuList;
  },
  setPermissionList(state: any, permissionList: any) {
    state.permissionList = permissionList;
  },
  toggleNavCollapse(state: any) {
    state.isSidebarNavCollapse = !state.isSidebarNavCollapse;
  },
  setCrumbList(state: any, list: any) {
    state.crumbList = list;
  },
};

const actions = {
  setMenuList({ commit, state, dispatch }: any, menuList: any) {
    commit("setMenuList", menuList);
  },
  setLeftMenuList({ commit, state, dispatch }: any, leftMunuList: any) {
    commit("setLeftMenuList", leftMunuList);
  },
  setPermissionList({ commit, state, dispatch }: any, permissionList: any) {
    if (sessionStorage.getItem("store")) {
      store.replaceState(
        Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
      sessionStorage.removeItem("store");
    }
    permissionList = permissionList || sessionStorage.permissionList;
    commit("setPermissionList", permissionList);
    sessionStorage.permissionList = permissionList;
    let MainContainer = DynamicRoutes.find((item) => item.path == "");
    let children = MainContainer.children;
    children.push(...filterRoute(permissionRoutes));
    commit("setLeftMenuList", children);
    function filterRoute(Router) {
      for (let i = 0; i < Router.length; i++) {
        if (
          Router[i].meta &&
          Router[i].meta.permission &&
          !permissionList.includes(Router[i].meta.permission)
        ) {
          Router.splice(i, 1);
          i--;
          continue;
        }
        Router[i].children &&
          (Router[i].children = filterRoute(Router[i].children));
      }
      return Router;
    }
    function setDefaultRoute(routes) {
      routes.forEach((v) => {
        if (v.children && v.children.length > 0) {
          v.redirect = { name: v.children[0].name };
          setDefaultRoute(v.children);
        }
      });
    }
    setDefaultRoute([MainContainer]);
    console.log(MainContainer);
    DynamicRoutes.map((item) => {
      router.addRoute(item);
    });
    commit("setMenuList", [...router.options.routes, ...DynamicRoutes]);
    /*     addRouteLoop(DynamicRoutes, undefined);
    function addRouteLoop(routes: any, name) {
      routes.map(item => {
        if(name) {
          router.addRoute(name, item)
        }else {
          router.addRoute(item)
        }
        item.children && addRouteLoop(item.children, item.name)
      })
    } */
  },
};
const getters = {
  menuList: (state: any) => state.menuList,
  token: (state: any) => state.token,
  leftMunuList: (state: any) => state.leftMunuList,
};
export default {
  state,
  mutations,
  actions,
  getters,
  namespace: true,
};
