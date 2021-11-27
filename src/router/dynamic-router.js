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
        meta: {
          name: '用户列表'
        },
        component: () => import("../views/userManagement/userList/index.vue")
      },
      {
        path: 'addOrEditUser',
        name: 'addOrEditUser',
        meta: {
          imgId: '2',
          name: '新增/编辑用户',
        },
        component: () => import("../views/userManagement/addOrEditUser/index.vue")
      },
    ]
  },
  {
    path: 'orderManagement',
    name: 'orderManagement',
    meta: {
      name: '订单管理',
      permission: 1
    },
    component: empty,
    children: [
      {
        path: 'refundOrderManagement',
        name: 'refundOrderManagement',
        meta: {
          name: '退款订单',
          permission: 1
        },
        component: empty,
        children: [
          {
            path: 'refundOrderList',
            name: 'refundOrderList',
            component: () => import("@/views/orderManagement/refundOrderManagement/refundOrderList.vue"),
          }
        ]
      },
      {
        path: 'shipOrderManagement',
        name: 'shipOrderManagement',
        meta: {
          name: '包船订单',
          permission: 1
        },
        component: empty,
        children: [
          {
            path: 'shipOrderList',
            name: 'shipOrderList',
            component: () => import("@/views/orderManagement/shipOrderManagement/shipOrderList.vue"),
          }
        ]
      }
    ]
  }
]

export default Routes;
