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
import { type Transaction, TransactionType } from "@/types";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { storeToRefs } from "pinia";
import ASelect from "./ASelect.vue";

const props = defineProps<{ transactions: Transaction[] }>();

const { categories } = storeToRefs(useCategoryStore());
const selectedCategory = ref<string>((1).toString());

const categoryOptions = computed(() =>
    categories.value.map(cat => ({ value: cat.id.toString(), label: cat.name }))
);

const filteredTransactions = computed(() => {
    console.log(props.transactions, selectedCategory.value)
    if (!selectedCategory.value) return props.transactions;
    return props.transactions.filter(tx => tx.categoryId.toString() === selectedCategory.value);
});
</script>