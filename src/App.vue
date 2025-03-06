<script setup lang="ts">
import { useFinanceStore } from '@/stores/useFinanceStore';
import { useBalance } from '@/composables/useBalance';
import ACard from '@/components/ACard.vue';
import AButton from '@/components/AButton.vue';
import { AColor } from './types/common';
import { TransactionType } from './types/finance';

const financeStore = useFinanceStore();
const { balance, transactions } = financeStore;
const { addTransaction } = useBalance();
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-4">💰 Мои Финансы</h1>

    <ACard title="Текущий баланс:">
      <span class="text-green-500">{{ balance }} ₽</span>
      <div class="flex gap-4 mt-4">
        <AButton :color="AColor.Green" text="➕ Доход" @click="addTransaction(TransactionType.Income, 1000, 'Бонус')" />
        <AButton :color="AColor.Red" text="➖ Расход" @click="addTransaction(TransactionType.Expense, 500, 'Кофе')" />
      </div>
    </ACard>

    <div class="mt-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-2">📜 История транзакций</h3>
      <ul class="bg-white p-4 rounded-lg shadow-md">
        <li v-for="tx in transactions" :key="tx.id" class="flex justify-between py-2 border-b">
          <span>{{ tx.description }}</span>
          <span :class="tx.type === 'income' ? 'text-green-500' : 'text-red-500'">
            {{ tx.type === 'income' ? '+' : '-' }}{{ tx.amount }} ₽
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>