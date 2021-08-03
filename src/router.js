import { createRouter, createWebHistory } from 'vue-router';

import layout from './pages/layout/index.vue'
import reg from './pages/reg/index.vue'
import login from './pages/login/index.vue'
import main from './pages/main/index.vue'
import role from './pages/role/index.vue'
import inventoryList from './pages/inventory/list.vue'
import inventoryEdit from './pages/inventory/edit.vue'

import itemList from './pages/item/list.vue'
import itemEdit from './pages/item/edit.vue'

const routes = [
    {
        path: '/',
        component: layout
    },
    {
        path: '/reg',
        component: reg
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/main',
        component: main,
        children: [
            { path: '', component: inventoryList },
            { path: 'inventory', component: inventoryList },
            { path: 'postInventory/:inventoryid?', component: inventoryEdit },
            { path: 'item/:inventoryid', component: itemList },
            { path: 'postItem/:inventoryid/:itemid?', component: itemEdit },
            { path: 'team', component: role },
        ]
    },

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    var user = localStorage.getItem('user')
    var whiteArr = ['/', '/reg', '/login']
    if (!whiteArr.includes(to.path) && !user) {
        next('/')
    } else {
        next()
    }
})

export default router