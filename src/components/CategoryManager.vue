<template>
    <div class="flex flex-col gap-2 flex-1 min-h-0">
        <h3 class="text-lg font-semibold">📂 Категории</h3>
        
        <div class="flex gap-2 w-full">
            <AInput v-model="newCategoryName" placeholder="Название категории" />
            <TransactionCategorySelect v-model="newCategoryType" />
            <AButton @click="handleAddCategory">Добавить</AButton>
        </div>

        <div class="flex-1 min-h-0 overflow-y-auto bg-white p-4 rounded-lg shadow-md">
            <ul class="space-y-2">
                <li v-for="cat in categories" :key="cat.type" class="flex justify-between py-2 border-b last:border-b-0">
                    <span>{{ cat.name }} {{ cat.type }}</span>
                    <AButton @click="deleteCategory(cat.id)">Удалить</AButton>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TransactionCategoryType } from "@/types";
import AInput from "@/components/AInput.vue";
import AButton from "@/components/AButton.vue";
import TransactionCategorySelect from "./TransactionCategorySelect.vue";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { storeToRefs } from "pinia";

const {addCategory, deleteCategory} = useCategoryStore();
const {categories} = storeToRefs(useCategoryStore());

const newCategoryName = ref("");
const newCategoryType = ref<TransactionCategoryType>(TransactionCategoryType.Salary);

const handleAddCategory = () => {
    if (!newCategoryName.value.trim() || !newCategoryType.value) return;

    addCategory(newCategoryName.value, newCategoryType.value);
    newCategoryName.value = "";
};
</script>
