<template>
    <div class="flex flex-col gap-2">
        <span>Баланс: {{ balance }} ₽</span>
        <AInput v-model="description" placeholder="Описание" />
        <AInput v-model="amount" type="number" placeholder="Сумма" @update:model-value="(newAmount) => amount = parseInt(newAmount)" />
        <ASelect v-model="category" :options="categoryOptions" />
        <AButton @click="addTx(TransactionType.Income)">+ Доход</AButton>
        <AButton @click="addTx(TransactionType.Expense)">- Расход</AButton>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { TransactionType } from "@/types";
import AInput from "./AInput.vue";
import ASelect from "./ASelect.vue";
import AButton from "./AButton.vue";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { storeToRefs } from "pinia";

const financeStore = useFinanceStore();
const {categories} = storeToRefs(useCategoryStore());
const {balance} = storeToRefs(financeStore)

const description = ref<string>("");
const amount = ref<number>(0);
const category = ref(categories.value?.[0]?.id.toString());

const categoryOptions = computed(() =>
    categories.value.map((cat) => ({ value: cat.id.toString(), label: cat.name }))
);

const addTx = (type: TransactionType) => {
    if (!description.value || amount.value <= 0) return;

    financeStore.addTransaction({
        description: description.value,
        amount: amount.value,
        type,
        categoryId: parseInt(category.value),
        date: new Date(),
    });

    description.value = "";
    amount.value = 0;
};
</script>