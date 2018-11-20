import Vue from 'vue'
import Router from 'vue-router'
import tempConverter from '@/components/tempConverter'
import magic8Ball from '@/components/magic8Ball'
import rockPaperScissors from '@/components/rockPaperScissors'
import subCipher from '@/components/subCipher'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    {
      path: '/rockPaperScissors',
      name: 'rockPaperScissors',
      component: rockPaperScissors
    },
    {
      path: '/subCipher',
      name: 'subCipher',
      component: subCipher
    },
  ]
})
