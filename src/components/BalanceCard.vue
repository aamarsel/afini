<template>
    <div class="flex flex-col gap-2">
        <AInput v-model="description" placeholder="Описание" />
        <AInput v-model="amount" type="number" placeholder="Сумма" />
        <ASelect v-model="category" :options="categoryOptions" />
        <button @click="addTx(TransactionType.Income)" class="text-white">+ Доход</button>
        <button @click="addTx(TransactionType.Expense)" class="text-white">- Расход</button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { categories } from "@/constants/categories";
import { TransactionType } from "@/types/finance";
import AInput from "./AInput.vue";
import ASelect from "./ASelect.vue";

const description = ref<string>("");
const amount = ref<number>(0);
const category = ref(categories[0].type);
const emit = defineEmits(["addTransaction"]);

const categoryOptions = computed(() =>
    categories.map((cat) => ({ value: cat.type, label: cat.name }))
);

const addTx = (type: TransactionType) => {
    if (!description.value || amount.value <= 0) return;

    emit("addTransaction", {
        id: Date.now().toString(),
        description: description.value,
        amount: amount.value,
        type,
        category: category.value,
        date: new Date().toISOString(),
    });

    description.value = "";
    amount.value = 0;
};
</script>