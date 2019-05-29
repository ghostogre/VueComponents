import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/pages/FormExample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/form',
      name: 'form',
      component: Form
    }
  ]
})
