<template>
    <div class="flex flex-col gap-2">
        <AInput v-model="description" placeholder="Описание" />
        <AInput v-model="amount" type="number" placeholder="Сумма" />
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
import { storeToRefs } from "pinia";

const {categories} = storeToRefs(useCategoryStore());

const description = ref<string>("");
const amount = ref<number>(0);
const category = ref(categories.value[0].id);
const emit = defineEmits(["addTransaction"]);

const categoryOptions = computed(() =>
    categories.value.map((cat) => ({ value: cat.id, label: cat.name }))
);

const addTx = (type: TransactionType) => {
    if (!description.value || amount.value <= 0) return;

    emit("addTransaction", {
        id: Date.now().toString(),
        description: description.value,
        amount: amount.value,
        type,
        categoryId: category.value,
        date: new Date().toISOString(),
    });

    description.value = "";
    amount.value = 0;
};
</script>