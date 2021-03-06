import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', //如果父路由有默认子路由 那么它的name就没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由 只能有一个
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          keepAlive: true //需要被缓存
        }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true,
    meta: {
      keepAlive: true //需要被缓存
    }
    // 开启props传参 就是把路由参数映射到组件中的props属性中
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('@/views/user-profile/index')
  }

]

const router = new VueRouter({
  routes
})

export default router
