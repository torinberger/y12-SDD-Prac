import Vue from 'vue'
import Router from 'vue-router'
import tempConverter from '@/components/tempConverter'
import magic8Ball from '@/components/magic8Ball'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tempConverter',
      component: tempConverter
    },
    {
      path: '/magic8Ball',
      name: 'magic8Ball',
      component: magic8Ball
    },
  ]
})
