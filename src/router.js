import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Browse from './views/Browse.vue'
import Property from './views/Property.vue'
import PageNotFound from './views/PageNotFound.vue'
import Profile from './views/Profile.vue'
import Content from "@/views/Content";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/browse', //列表页
      name: 'browse',
      component: Browse
    },
    {
      path: '/property/:id', //详情页
      name: 'property',
      component: Property
    },
    {
      path: "/profile",
      name: 'profile',
      component: Profile,
    },
    {
      path: "/content/:id",
      name: 'content',
      component: Content,
    },
    { 
      path: "*", 
      name: 'pagenotfound',
      component: PageNotFound,
    }
  ]
})
