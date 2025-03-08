import { defineStore } from "pinia";
import { ref } from "vue";
import { type TransactionCategory, TransactionCategoryType } from "@/types";

export const useCategoryStore = defineStore("category", () => {
    const categories = ref<TransactionCategory[]>([
        { name: "Зарплата", type: TransactionCategoryType.Salary, id: 1 },
        { name: "Продукты", type: TransactionCategoryType.Groceries, id: 2 },
        { name: "Кафе", type: TransactionCategoryType.Cafe, id: 3 },
        { name: "Транспорт", type: TransactionCategoryType.Transport, id: 4 },
        { name: "Развлечения", type: TransactionCategoryType.Entertainment, id: 5 },
        { name: "Здоровье", type: TransactionCategoryType.Health, id: 6 },
        { name: "Бонус", type: TransactionCategoryType.Bonus, id: 7 },
    ]);

    const addCategory = (name: string, type: TransactionCategoryType) => {
        categories.value.push({ name, type, id: Date.now() });
    };

    const deleteCategory = (id: number) => {
        categories.value = categories.value.filter(cat => cat.id !== id);
    };

    const updateCategory = (id: number, newName: string) => {
        const category = categories.value.find(cat => cat.id === id);
        if (category) category.name = newName;
    };

    return { categories, addCategory, deleteCategory, updateCategory };
});