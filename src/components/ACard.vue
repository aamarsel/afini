<script setup lang="ts">
interface Props {
    title: string;
}

defineProps<Props>();
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <slot />
    </div>
</template>