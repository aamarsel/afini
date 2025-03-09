import { defineStore } from "pinia";
import { ref } from "vue";
import { type TransactionCategory, TransactionCategoryType } from "@/types";
import { openDB, STORE_CATEGORIES } from "@/db";
import { dbRequest, addToStore, deleteFromStore } from "@/db/utils";

export const useCategoryStore = defineStore("category", () => {
    const categories = ref<TransactionCategory[]>([]);

    const loadCategories = async () => {
        const db = await openDB();
        const store = db.transaction(STORE_CATEGORIES, "readonly").objectStore(STORE_CATEGORIES);

        categories.value = await dbRequest(store.getAll());
    };

    const addCategory = async (name: string, type: TransactionCategoryType) => {
        const db = await openDB();
		const newCategory = { id: Date.now(), name, type };

		await addToStore(db, "categories", newCategory);
		await loadCategories();
    };

    const deleteCategory = async (id: number) => {
        const db = await openDB();
		await deleteFromStore(db, "categories", id);
		await loadCategories();
    };

    const updateCategory = (id: number, newName: string) => {
        const category = categories.value.find(cat => cat.id === id);
        if (category) category.name = newName;
    };

    loadCategories();

    return { categories, addCategory, deleteCategory, updateCategory };
});