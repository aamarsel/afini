<template>
	<n-layout-header class="flex justify-between items-center px-6 py-4 bg-white shadow-md">
		<n-menu v-model:value="selectedKey" :options="menuOptions" mode="horizontal" @update:value="navigate" />
		<n-switch v-model:value="localIsDark" />
	</n-layout-header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NMenu, NSwitch, NLayoutHeader } from 'naive-ui'
 
const route = useRoute()
const router = useRouter()
const selectedKey = ref(route.path)

const navigate = (key: string) => {
	router.push(key)
}

const menuOptions = ref([
	{ label: 'Главная', key: '/' },
	{ label: 'Транзакции', key: '/transactions' },
	{ label: 'Категории', key: '/categories' },
	{ label: 'Аналитика', key: '/ai' }
])

const props = defineProps<{ isDark: boolean }>()
const emit = defineEmits(['update:isDark'])
const localIsDark = ref(props.isDark)

watch(() => localIsDark.value, () => {
	emit('update:isDark', localIsDark.value)
})

watch(() => route.path, (path) => {
	selectedKey.value = path
})
</script>