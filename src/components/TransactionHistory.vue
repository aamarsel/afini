<template>
    <div class="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div class="flex gap-2 mb-2">
            <ASelect v-model="selectedCategory" :options="categoryOptions" />
        </div>

        <ul class="bg-white p-4 rounded-lg shadow-md flex-1 min-h-0 overflow-y-auto">
            <li v-for="tx in filteredTransactions" :key="tx.id"
                class="flex justify-between py-2 border-b last:border-b-0">
                <span>{{ tx.description }}</span>
                <span :class="tx.type === TransactionType.Income ? 'text-green-500' : 'text-red-500'">
                    {{ tx.type === TransactionType.Income ? '+' : '-' }}{{ tx.amount }} ₽
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { type Transaction, TransactionType, TransactionCategoryType } from "@/types/finance";
import { categories } from "@/constants/categories";
import ASelect from "./ASelect.vue";

const props = defineProps<{ transactions: Transaction[] }>();
const selectedCategory = ref<TransactionCategoryType>(TransactionCategoryType.Salary);

const categoryOptions = computed(() =>
    categories.map(cat => ({ value: cat.type, label: cat.name }))
);

const filteredTransactions = computed(() => {
    console.log(props.transactions)
    if (!selectedCategory.value) return props.transactions;
    return props.transactions.filter(tx => tx.category === selectedCategory.value);
});
</script>