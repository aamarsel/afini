<template>
    <input 
        :type="type" 
        :placeholder="placeholder" 
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="border-b-amber-950 bg-white h-10 border-2 rounded-md pl-3" 
    />
</template>
<script setup lang="ts">
defineProps<{
    type?: string;
    placeholder?: string;
    modelValue: string | number;
}>();

defineEmits(["update:modelValue"]);
</script>