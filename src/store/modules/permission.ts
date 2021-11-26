import router, { DynamicRoutes } from "../../router/index"
import permissionRoutes from "../../router/dynamic-router.js"
const state ={
  token: null,
  menuList: [],
  leftMunuList: [],
  permissionList: []
}
const mutations = {
  setMenuList(state:any, menuList:any) {
    state.menuList = menuList;
  },
  setLeftMenuList(state:any, leftMunuList:any) {
    state.leftMunuList = leftMunuList
  },
  setPermissionList(state:any, setPermissionList:any) {
    state.setPermissionList = setPermissionList
  }
}

const actions = {
  setMenuList({ commit, state, dispatch }: any, menuList: any) {
    commit('setMenuList', menuList)
  },
  setLeftMenuList({ commit, state, dispatch }: any, leftMunuList: any) {
    
    commit('setLeftMenuList', leftMunuList)
  },
  setPermissionList({ commit, state, dispatch }: any, permissionList: any) {
    commit('setPermissionList', permissionList)
    // console.log(permissionRoutes,DynamicRoutes, 'permissionRoutes');
    let MainContainer = DynamicRoutes.find(item => item.path == '')
    let children = MainContainer.children;
    children.push(...filterRoute(permissionRoutes));
    commit("setLeftMenuList", children)
    function filterRoute(Router) {
      for(let i = 0;i<Router.length;i++) {
        if(Router[i].meta && Router[i].meta.permission && !permissionList.includes(Router[i].meta.permission)) {
          Router.splice(i, 1)
          i--;
          continue;
        }
        Router[i].children && (Router[i].children = filterRoute(Router[i].children))
      }
      return Router;
    }
    commit("setMenuList", [...router.options.routes, ...DynamicRoutes])
    console.log(DynamicRoutes, 'DynamicRoutes');
    // DynamicRoutes.map(item => {
    //   router.addRoute(item)
    // })
    addRouteLoop(DynamicRoutes);
    function addRouteLoop(routes: any, name) {
      routes.map(item => {
        console.log(name, item);
        if(name) {
          router.addRoute(name, item)
        }else {
          router.addRoute(item)
        }
        item.children && addRouteLoop(item.children, item.name)
      })
    }
    console.log(router.getRoutes());

  }
}
const getters = {
  menuList: (state: any) => state.menuList,
  token: (state: any) => state.token,
  leftMunuList: (state: any) => state.leftMunuList,
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespace: true
}