<script setup lang="ts">
interface Props {
	text: string;
}

defineProps<Props>();
</script>

<template>
	<button class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
		{{ text }}
	</button>
</template>