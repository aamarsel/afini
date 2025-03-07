<template>
    <select 
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        class="border-b-amber-950 bg-white h-10 border-2 rounded-md pl-3"
    >
        <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string;
    options: { value: string; label: string }[];
}>();

defineEmits(["update:modelValue"]);
</script>