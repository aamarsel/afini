import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AIView from './views/AIView.vue'
import TransactionsView from './views/TransactionsView.vue'
import CategoryView from './views/CategoryView.vue'

const routes = [
	{ path: '/', component: HomeView },
	{ path: '/ai', component: AIView },
	{ path: '/transactions', component: TransactionsView},
	{ path: '/categories', component: CategoryView}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
