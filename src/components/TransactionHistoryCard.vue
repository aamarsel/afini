<template>
    <NCard content-class="flex flex-col flex-1 min-h-0 overflow-hidden w-full max-w-full">
        <div class="flex gap-2 mb-2">
            <NSelect v-model:value="selectedCategory" :options="categoryOptions" />
        </div>
        <NUl>
            <NLi v-for="tx in filteredTransactions" :key="tx.id">
                <div class="flex gap-10 items-center justify-between w-full">
                    <template v-if="editingId === tx.id">
                        <div class="flex gap-4">
                            <NInput v-model:value="editDescription" placeholder="Описание" />
                            <NInputNumber v-model:value="editAmount" placeholder="Сумма" :show-button="false" />
                            <NSelect v-model:value="editCategory" :options="categoryOptions" />
                        </div>
                        <div class="flex gap-2">
                            <NButton @click="saveEdit(tx.id)">✅</NButton>
                            <NButton @click="cancelEdit">❌</NButton>
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex gap-4 w-full">
                            <NText>{{ tx.description }}</NText>
                            <NText>
                                {{ tx.type === TransactionType.Income ? '+' : '-' }}{{ tx.amount }} ₽
                            </NText>
                        </div>
                        <div class="flex gap-2">
                            <NButton @click="startEdit(tx)">✏️</NButton>
                            <NButton @click="() => financeStore.deleteTransaction(tx.id)">❌</NButton>
                        </div>
                    </template>
                </div>
            </NLi>
        </NUl>
    </NCard>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { type Transaction, TransactionType } from "@/types";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { storeToRefs } from "pinia";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { NButton, NCard, NSelect, NUl, NLi, NInput, NText, NInputNumber } from "naive-ui";

const props = defineProps<{ transactions: Transaction[] }>();

const financeStore = useFinanceStore();
const { categories } = storeToRefs(useCategoryStore());
const selectedCategory = ref<string>('1');

const categoryOptions = computed(() =>
    categories.value.map(cat => ({ value: cat.id.toString(), label: cat.name }))
);

const filteredTransactions = computed(() => {
    if (!selectedCategory.value) return props.transactions;
    return props.transactions?.filter(tx => tx.categoryId.toString() === selectedCategory.value) || [];
});

const editingId = ref<number | null>(null);
const editDescription = ref<string>("");
const editAmount = ref<number>(0);
const editCategory = ref<string>();

const startEdit = (tx: Transaction) => {
    editingId.value = tx.id;
    editDescription.value = tx.description;
    editAmount.value = tx.amount;
    editCategory.value = tx.categoryId.toString();
};

const cancelEdit = () => {
    editingId.value = null;
};

const saveEdit = async (id: number) => {
    if (!editDescription.value.trim() || !editAmount.value || !editCategory.value) return;
    await financeStore.updateTransaction({
        id,
        description: editDescription.value,
        amount: typeof editAmount.value === 'string' ? parseInt(editAmount.value) : editAmount.value,
        categoryId: parseInt(editCategory.value),
        type: props.transactions.find(tx => tx.id === editingId.value)?.type,
    });
    cancelEdit();
};

</script>