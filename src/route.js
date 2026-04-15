import admin from './components/admin.vue'
import welcome from './components/welcome.vue'
import subject from './components/subject.vue'
import catalog from './components/catalog.vue'
import errors from './components/error.vue'
import edit from './components/edit.vue'
import store from './components/store.vue'
import auto from './components/auto.vue'
import registr from './components/registr.vue'
import checkout from './components/checkout.vue'
import profile from './components/profile.vue'
import user from './components/user.vue'
import character from './components/character.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import useUsers from './composables/useUsers'

const routes = [
    { path: '/', component: welcome, name: 'welcome' },
    { path: '/catalog', component: catalog, name: 'catalog' },
    { path: '/auto', component: auto, name: 'auto', meta: { needAuth: false } },
    { path: '/registr', component: registr, name: 'registr', meta: { needAuth: false } },
    { path: '/store', component: store, name: 'store', meta: { needAuth: true } },
    { path: '/checkout', component: checkout, name: 'checkout', meta: { needAuth: true } },
    { path: '/profile/:id([0-9])*', component: profile, name: 'profile', meta: { needAuth: true } },
    { path: '/user', component: user, name: 'user', meta: { needAdmin: true } },
    {
        path: '/subject/:id([0-9])*', component: subject, name: 'subject', children: [
            { path: 'character', component: character, name: 'character' },
            { path: 'edit', component: edit, name: 'edit', meta: { needAdmin: true } }
        ]
    },
    { path: '/admin', component: admin, name: 'admin', meta: { needAdmin: true } },
    { path: '/:Errors(.+)', component: errors, name: 'errors' }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // Получаем актуальное состояние авторизации внутри guard
    const { isAdmin } = useUsers()
    const isAuthenticated = !!isAdmin.value
    const isAdminUser = isAdmin.value?.role === 'admin'

    // Проверка на авторизацию (needAuth)
    if (to.meta.needAuth && !isAuthenticated) {
        return next({ name: 'errors', params: { Errors: '403' } })
    }

    // Проверка на роль администратора (needAdmin)
    if (to.meta.needAdmin && !isAdminUser) {
        return next({ name: 'errors', params: { Errors: '403' } })
    }

    // Все проверки пройдены
    next()
})