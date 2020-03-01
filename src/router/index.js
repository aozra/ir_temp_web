import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// const helloworld = () => import('@/components/HelloWorld')
const temperatureinput = () => import('@/components/temperatureInput')
const temperatureshow = () => import('@/components/temperatureShow')
const home = () => import('@/components/Home')
const welcome = () => import('@/components/Welcome')
const informationreg = () => import('@/components/InformationReg')
const userlist = () => import('@/components/UserList')
export default new VueRouter({
	// mode: 'history',
  routes: 
  [
    {
      path: '/temperatureinput',
      name: 'temperatureinput',
      component: temperatureinput
    },
    {
      path: '/temperatureshow',
      name: 'temperatureshow',
      component: temperatureshow
    },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: '/welcome',
      children:[{
        path: 'welcome',
        name: 'welcome',
        component: welcome
      },
      {
        path: '/informationreg',
        name: 'informationreg',
        component: informationreg
      },
      {
        path: '/userlist',
        name: 'userlist',
        component: userlist
      }
    ]},
    {
      path: '/',
      redirect: 'home'
    },
  ]
})