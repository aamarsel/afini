<template>
    <div class="flex flex-col flex-1 min-h-0 overflow-hidden">
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
            📜 История транзакций
        </h3>
        <ul class="bg-white p-4 rounded-lg shadow-md flex-1 min-h-0 overflow-y-auto">
            <li v-for="tx in transactions" :key="tx.id" class="flex justify-between py-2 border-b last:border-b-0">
                <span>{{ tx.description }}</span>
                <span :class="tx.type === TransactionType.Income ? 'text-green-500' : 'text-red-500'">
                    {{ tx.type === TransactionType.Income ? '+' : '-' }}{{ tx.amount }} ₽
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { TransactionType, type Transaction } from "@/types/finance";

defineProps<{
    transactions: Transaction[];
}>();
</script>
