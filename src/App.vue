<template>
	<n-config-provider :theme="theme">
		<n-global-style />
		<div class="min-h-screen flex flex-col bg-gray-100">
			<AHeader v-model:isDark="isDark" />
			<router-view class="flex-1 p-6" />
		</div>
	</n-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import AHeader from '@/components/AHeader.vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')
const theme = ref(lightTheme)

const updateTheme = (value: boolean) => {
	isDark.value = value
	theme.value = isDark.value ? darkTheme : lightTheme
	localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
	isDark.value = localStorage.getItem('theme') === 'dark'
	theme.value = isDark.value ? darkTheme : lightTheme
})

watch(() => isDark.value, updateTheme)
</script>
