<template>
    <NCard content-class="flex gap-10">
		<div class="flex flex-col items-center h-full grow-0">
			<h1 class="text-3xl font-bold mb-4">💰 Мои Финансы</h1>

			<BalanceCard />
			<TransactionHistory :transactions="transactions" />
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
    </NCard>
</template>

<script setup lang="ts">
import { useFinanceStore } from "@/stores/useFinanceStore";
import { storeToRefs } from "pinia";
import BalanceCard from "@/components/BalanceCard.vue";
import TransactionHistory from "@/components/TransactionHistoryCard.vue";
import CategoryManager from "@/components/CategoryManager.vue";
import CategoryChart from "@/components/CategoryChart.vue";
import DateChart from "@/components/DateChart.vue";
import AIAnalysis from "@/components/AIAnalysis.vue";
import { NCard } from "naive-ui";

const financeStore = useFinanceStore();
const { transactions } = storeToRefs(financeStore);
</script>
  