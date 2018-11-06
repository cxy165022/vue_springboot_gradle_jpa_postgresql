// 路由配置
export default[
  {
    path: '/login',
    name: 'Login',
    component: resolve => {
      require(['@/views/Login'], resolve)
    }
  }, {
    path: '*',
    name: 'NotFound',
    component: resolve => {
      require(['@/views/common/pages/NotFound'], resolve)
    }
  }
]
