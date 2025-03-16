<template>
    <n-card content-class="p-6 flex flex-col items-center gap-10">
        <n-h1 class="text-3xl font-bold mb-4">Мои финансы</n-h1>
        <BalanceCard />
        <TransactionHistory :transactions="transactions" />
    </n-card>
</template>
<script setup lang="ts">
import BalanceCard from '@/components/BalanceCard.vue';
import TransactionHistory from '@/components/TransactionHistoryCard.vue';
import { useFinanceStore } from '@/stores/useFinanceStore';
import { storeToRefs } from 'pinia';
import { NCard, NH1 } from 'naive-ui';

const {transactions} = storeToRefs(useFinanceStore());
</script>
