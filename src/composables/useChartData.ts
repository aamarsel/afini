import { computed, type ComputedRef } from "vue";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { storeToRefs } from "pinia";
import { getCategoryNameFromCategoryId } from "@/utils";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { TransactionType } from "@/types";
import type { ChartData, ChartType } from "chart.js";

export const useChartData = (type: "date" | "category"): ComputedRef<ChartData<ChartType>> => {
    const { transactions } = storeToRefs(useFinanceStore());
    const { categories } = storeToRefs(useCategoryStore());

    return computed(() => {
        if (!transactions.value?.length) return {
            labels: [],
            datasets: [],
        };

        let chartData: Record<string, number> = {};

        if (type === "date") {
            chartData = transactions.value.reduce((acc: Record<string, number>, tx) => {
                const date = new Date(tx.date).toISOString().split('T')[0];
                acc[date] = (acc[date] || 0) + tx.amount;
                return acc;
            }, {});
        } else if (type === "category") {
            chartData = transactions.value
                .filter((tx) => tx.type === TransactionType.Expense)
                .reduce((acc: Record<string, number>, tx) => {
                    const categoryName = getCategoryNameFromCategoryId(tx.categoryId, categories.value) as string;
                    acc[categoryName] = (acc[categoryName] || 0) + tx.amount;
                    return acc;
                }, {});
        }

        return {
            labels: Object.keys(chartData),
            datasets: [
                {
                    label: type === "date" ? "Расходы по датам" : "Расходы по категориям",
                    data: Object.values(chartData),
                    backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
                },
            ],
        };
    });
}