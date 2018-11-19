import Vue from 'vue'
import Router from 'vue-router'
import tempConverter from '@/components/tempConverter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tempConverter',
      component: tempConverter
    }
  ]
})
