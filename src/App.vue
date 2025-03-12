<template>
  <div class="min-h-screen flex items-center bg-gray-100 p-6 h-full gap-10">
    <div class="flex flex-col items-center h-full grow-0">
      <h1 class="text-3xl font-bold mb-4">💰 Мои Финансы</h1>

      <BalanceCard :balance="balance" />

      <div class="flex flex-col w-full max-w-md flex-1 min-h-0 overflow-y-hidden overflow-x-auto pb-10 pt-10">
        <TransactionHistory :transactions="transactions" />
      </div>
    </div>
    <div class="flex flex-col w-full max-w-md min-h-0 h-full pb-10 pt-10">
      <CategoryManager />
    </div>
    <div class="flex flex-col w-full max-w-md min-h-0 h-full pb-10 pt-10">
      <CategoryChart />
      <DateChart />
    </div>
    <div class="flex flex-col w-full max-w-md min-h-0 h-full pb-10 pt-10">
      <AIAnalysis />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFinanceStore } from "@/stores/useFinanceStore";
import BalanceCard from "@/components/BalanceCard.vue";
import TransactionHistory from "@/components/TransactionHistory.vue";
import { storeToRefs } from "pinia";
import CategoryManager from "@/components/CategoryManager.vue";
import CategoryChart from "@/components/CategoryChart.vue";
import DateChart from "./components/DateChart.vue";
import AIAnalysis from "./components/AIAnalysis.vue";

const financeStore = useFinanceStore();
const { balance, transactions } = storeToRefs(financeStore);
</script>
