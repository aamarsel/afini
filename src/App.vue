<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100 p-6 h-full">
    <h1 class="text-3xl font-bold mb-4">💰 Мои Финансы</h1>

    <BalanceCard :balance="balance" @add-transaction="addTransaction" />

    <div class="flex flex-col w-full max-w-md flex-1 min-h-0 overflow-hidden pb-10 pt-10">
      <TransactionHistory :transactions="transactions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFinanceStore } from "@/stores/useFinanceStore";
import { useBalance } from "@/composables/useBalance";
import BalanceCard from "@/components/BalanceCard.vue";
import TransactionHistory from "@/components/TransactionHistory.vue";
import { storeToRefs } from "pinia";

const financeStore = useFinanceStore();
const { balance, transactions } = storeToRefs(financeStore);
const { addTransaction } = useBalance();
</script>
