<template>
	<div class="bg-white p-4 rounded-lg shadow-md w-full">
		<Line v-if="type === 'line' && chartData" :data="chartData as ChartData<'line'>" :options="chartOptions" />
		<Bar v-else-if="type === 'bar' && chartData" :data="chartData as ChartData<'bar'>" :options="chartOptions" />
		<Pie v-else-if="type === 'pie' && chartData" :data="chartData as ChartData<'pie'>" :options="chartOptions" />
	</div>
</template>
<script setup lang="ts">
import { Line, Bar, Pie } from "vue-chartjs";
import { Chart, registerables, type ChartType, type ChartData } from "chart.js";

Chart.register(...registerables);

defineProps<{
	type: ChartType;
	chartData: ChartData<ChartType>;
}>();

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
};
</script>