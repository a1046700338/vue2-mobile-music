/* 全局路由配置 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/* 引入组件 */
import VantDemo from '@/views/VantDemo'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'
import Comment from '@/views/Comment'

const routes = [
    {
        path: '/',
        redirect: '/layout', /* 重定向 */
    },
    {
        path: '/layout',
        redirect: '/layout/home',
        component: Layout,
        children: [
            {
                path: "home",
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: "search",
                component: Search,
                meta: {
                    title: '搜索'
                }
            }
        ]
    },
    {
        path: '/vant_demo',
        component: VantDemo
    },
    {
        path: '/play',
        component: Play
    },
    {
        path: '/comment',
        component: Comment,
        meta: {
            title: '评论'
        }
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
})
/* 全局路由守卫 */
// router.beforeEach((to, from, next) => {
//     let isLogin = false
//     if (to.path === "/my_music" && isLogin === false) {
//         Dialog.confirm({
//             message: '请登录',
//             theme: 'round-button',
//         }).then(() => {
//             let timer = null
//             if (timer) clearTimeout(timer)
//             setTimeout(function(){
//                 next("/login")
//             },1000)
//         }).catch(() => {
//             next(false)
//         })
//     } else {
//         next()
//     }
// })

export default router