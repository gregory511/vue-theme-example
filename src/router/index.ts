import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            component: () => import('../components/views/Home.vue')
        },
        {
            name: "login",
            path: "/login",
            component: () => import('../components/views/Login.vue')
        },
        {
            name: "timing",
            path: "/timing",
            component: () => import('../components/views/ThrottleExample.vue')
        },
        {
            name: "register",
            path: "/register",
            component: () => import('../components/views/Register.vue')
        },
        {
            name: "blog",
            path: "/blog",
            component: () => import('../components/views/Blog.vue')
        },
        {
            name: "blog.article",
            path: "/blog/:articleId",
            component: () => import('../components/views/ArticleDetails.vue'),
            props: (route) => {
                return {
                    articleId: Number(route.params.articleId)
                }
            }
        }
    ],
})

export default router
