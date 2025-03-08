<template>
    <ASelect 
        :modelValue="modelValue" 
        @update:modelValue="$emit('update:modelValue', $event)"
        :options="options"
    />
</template>
<script setup lang="ts">
import { transactionCategoryNames, type ASelectOption, TransactionCategoryType } from '@/types';
import ASelect from './ASelect.vue';

const options: ASelectOption[] = (Object.keys(transactionCategoryNames) as TransactionCategoryType[]).map((key: TransactionCategoryType) => ({
    value: key,
    label: transactionCategoryNames[key],
}));

defineProps<{
    modelValue: string;
}>()
</script>