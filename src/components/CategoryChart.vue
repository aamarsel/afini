<template>
	<AChart type="pie" :chartData="chartData" />
</template>

<script setup lang="ts">
import AChart from "@/components/AChart.vue";
import { useChartData } from "@/composables/useChartData";
import { type ChartData } from 'chart.js'
import { type ComputedRef } from "vue";

const chartData = useChartData("category") as unknown as ComputedRef<ChartData<"pie">>;
</script>