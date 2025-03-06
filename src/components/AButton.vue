<script setup lang="ts">
import { computed } from 'vue';
import { AColor } from '@/types/common';

interface Props {
	color?: AColor;
	text: string;
}

const props = defineProps<Props>();

const buttonClasses = computed(() => ({
	'bg-green-500': props.color === AColor.Green,
	'bg-red-500': props.color === AColor.Red,
	'bg-blue-500': props.color === AColor.Blue,
}));
</script>

<template>
	<button
		class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
		:class="buttonClasses" 
	>
		{{ text }}
	</button>
</template>