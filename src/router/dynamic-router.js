import empty from "../views/empty/index.vue"
const Routes = [
  {
    path: 'pageHome',
    name: 'pageHome',
    component: empty,
    meta: {
      imgId: '1',
      permission: 1,
      name: '首页概览'
    },
    children: [
      {
        path: 'dataBoard',
        name: 'dataBoard',
        meta: {
            imgId: '2',
            permission: 101,
            name: '数据看板'
        },
        component: () => import("../views/pageHome/dataBoard/index.vue")
    },
    ]
  },
  {
    path: 'userManagement',
    name: 'userManagement',
    meta: {
      imgId: '2',
      permission: 102,
      name: '用户管理'
    },
    component: empty,
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import("../views/userManagement/userList/index.vue")
      },
      {
        path: 'addOrEditUser',
        name: 'addOrEditUser',
        meta: {
          imgId: '2',
          name: '新增/编辑用户'
        },
        component: () => import("../views/userManagement/addOrEditUser/index.vue")
      },
    ]
  }
]

export default Routes;
