<template>
    <NCard content-class="flex flex-col gap-2 flex-1 min-h-0">
        <NH3>Категории</NH3>
        <div class="flex gap-5 items-center">
            <div class="flex gap-2 max-w-[400px] grow">
                <NInput v-model:value="newCategoryName" placeholder="Название категории" />
                <TransactionCategorySelect v-model="newCategoryType" />
            </div>
            <NButton @click="handleAddCategory">Добавить</NButton>
        </div>
        <NCard content-class="flex-1 min-h-0 overflow-y-auto p-4 rounded-lg shadow-md">
            <NUl class="space-y-2">
                <NLi v-for="cat in categories" :key="cat.type" class="flex justify-between items-center">
                    <NText>{{ cat.name }} {{ cat.type }}</NText>
                    <NButton @click="deleteCategory(cat.id)">Удалить</NButton>
                </NLi>
            </NUl>
        </NCard>
    </NCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TransactionCategoryType } from "@/types";
import TransactionCategorySelect from "./TransactionCategorySelect.vue";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { storeToRefs } from "pinia";
import { NH3, NInput, NCard, NUl, NLi, NText, NButton } from "naive-ui";

const { addCategory, deleteCategory } = useCategoryStore();
const { categories } = storeToRefs(useCategoryStore());

const newCategoryName = ref<string>();
const newCategoryType = ref<TransactionCategoryType>(TransactionCategoryType.Salary);

const handleAddCategory = () => {
    if (!newCategoryName.value?.trim() || !newCategoryType.value) return;

    addCategory(newCategoryName.value, newCategoryType.value);
    newCategoryName.value = "";
};
</script>
