import { computed, type ComputedRef, ref, watchEffect } from "vue";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { storeToRefs } from "pinia";
import { getCategoryNameFromCategoryId } from "@/utils";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { TransactionType } from "@/types";
import type { ChartData, ChartType } from "chart.js";
import { useThemeVars } from "naive-ui";

export const useChartData = (type: "date" | "category"): ComputedRef<ChartData<ChartType>> => {
    const { transactions } = storeToRefs(useFinanceStore());
    const { categories } = storeToRefs(useCategoryStore());

    const themeVars = useThemeVars();
    const isDark = ref(localStorage.getItem("theme") === "dark");

    window.addEventListener("storage", (event) => {
        console.log(event);
        if (event.key === "theme") {
            isDark.value = event.newValue === "dark";
            console.log(isDark.value);
        }
    });

    return computed(() => {
        if (!transactions.value?.length) return { labels: [], datasets: [] };

        let chartData: Record<string, number> = {};

        if (type === "date") {
            chartData = transactions.value.reduce((acc: Record<string, number>, tx) => {
                const date = new Date(tx.date).toISOString().split("T")[0];
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
                    backgroundColor: isDark.value
                        ? [themeVars.value.primaryColor, themeVars.value.infoColor, themeVars.value.warningColor]
                        : ["#f87171", "#60a5fa", "#34d399"],
                },
            ],
        };
    });
};
