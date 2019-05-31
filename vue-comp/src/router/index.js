import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/pages/FormExample'
import CheckBox from '@/pages/CheckBoxExample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: CheckBox
    }
  ]
})
