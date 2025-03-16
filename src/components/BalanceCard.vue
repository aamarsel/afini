<template>
    <NCard content-class="flex flex-col gap-2 max-w-[200px]" class="items-center">
        <NText>Баланс: {{ balance }} ₽</NText>
        <NInput v-model:value="description" placeholder="Описание" />
        <NInputNumber v-model:value="amount" placeholder="Сумма" :show-button="false" />
        <NSelect v-model:value="category" :options="categoryOptions" placeholder="Категория" />
        <NButton @click="addTx(TransactionType.Income)">+ Доход</NButton>
        <NButton @click="addTx(TransactionType.Expense)">- Расход</NButton>
    </NCard>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { TransactionType } from "@/types";
import { NInput, NInputNumber, NText, NSelect, NButton } from "naive-ui";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { storeToRefs } from "pinia";

const financeStore = useFinanceStore();
const {categories} = storeToRefs(useCategoryStore());
const {balance} = storeToRefs(financeStore)

const description = ref<string>("");
const amount = ref<number>();
const category = ref();

const categoryOptions = computed(() =>
    categories.value.map((cat) => ({ value: cat.id.toString(), label: cat.name }))
);

const addTx = (type: TransactionType) => {
    if (amount.value && (!description.value || amount.value <= 0)) return;

    financeStore.addTransaction({
        description: description.value,
        amount: amount.value!,
        type,
        categoryId: parseInt(category.value),
        date: new Date(),
    });

    description.value = "";
    amount.value = 0;
};
</script>