<template>
	<NCard class="p-4">
		<Line v-if="type === 'line' && chartData" :data="chartData as ChartData<'line'>" :options="chartOptions" />
		<Bar v-else-if="type === 'bar' && chartData" :data="chartData as ChartData<'bar'>" :options="chartOptions" />
		<Pie v-else-if="type === 'pie' && chartData" :data="chartData as ChartData<'pie'>" :options="chartOptions" />
	</NCard>
</template>
<script setup lang="ts">
import { Line, Bar, Pie } from "vue-chartjs";
import { Chart, registerables, type ChartType, type ChartData } from "chart.js";
import { NCard } from "naive-ui";
import { watchEffect } from "vue";

watchEffect(() => {
	console.log('lol');
});

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