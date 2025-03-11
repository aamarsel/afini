<template>
	<AChart type="line" :chartData="chartData" />
</template>

<script setup lang="ts">
import AChart from "@/components/AChart.vue";
import { useChartData } from "@/composables/useChartData";
import { type ChartData } from 'chart.js'
import { type ComputedRef } from "vue";

const chartData = useChartData("date") as unknown as ComputedRef<ChartData<"line">>;
</script>