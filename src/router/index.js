import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '@/components/components/mainPage.vue'
import SnakeGame from '@/components/components/page/SnakePage.vue'
import newGame from '@/components/components/page/buildBoards.vue'
import CollsionTest from '@/components/components/page/AvoidCollsion.vue'
import gun_Zi from '@/components/components/page/gun_Zi.vue'
import Maze_game from '@/components/components/page/Maze_game.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: mainPage // 配置首页组件
  },
  {
    path:'/snake',
    name: 'SnakeGame',
    component:SnakeGame,
  },
  {
    path:'/new',
    name: 'newGame',
    component:newGame,
  },
  {
    path:'/collsion',
    name: 'CollosionTes',
    component:CollsionTest,
  },
  {
    path:'/gunzi',
    name: 'GunZi',
    component:gun_Zi,
  },
  {
    path:'/maze',
    name: 'Maze',
    component:Maze_game,
  }


]

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes // 路由配置
})

export default router
