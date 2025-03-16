<template>
    <NSelect 
        :value="modelValue" 
        @update:value="$emit('update:modelValue', $event)"
        placeholder="Тип категории"
        :options="options"
    />
</template>
<script setup lang="ts">
import { transactionCategoryNames, TransactionCategoryType } from '@/types';
import {NSelect} from 'naive-ui';
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface';

const options: SelectMixedOption[] = (Object.keys(transactionCategoryNames) as TransactionCategoryType[]).map((key: TransactionCategoryType) => ({
    value: key,
    label: transactionCategoryNames[key],
}));

defineProps<{
    modelValue: string;
}>()
</script>