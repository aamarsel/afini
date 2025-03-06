<script setup>
import { ref } from 'vue';

const balance = ref(12500);
const transactions = ref([
  { id: 1, type: 'income', amount: 5000, description: 'Зарплата' },
  { id: 2, type: 'expense', amount: 1500, description: 'Продукты' },
  { id: 3, type: 'expense', amount: 2000, description: 'Кафе' },
]);
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-4">💰 Мои Финансы</h1>
    
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-xl font-semibold">Текущий баланс: <span class="text-green-500">{{ balance }} ₽</span></h2>
      
      <div class="flex gap-4 mt-4">
        <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">➕ Доход</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">➖ Расход</button>
      </div>
    </div>

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