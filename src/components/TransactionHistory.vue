<template>
    <div class="flex flex-col flex-1 min-h-0 overflow-hidden w-full max-w-full">
        <div class="flex gap-2 mb-2">
            <ASelect v-model="selectedCategory" :options="categoryOptions" />
        </div>

        <ul class="bg-white p-4 rounded-lg shadow-md flex-1 min-h-0 overflow-y-auto">
            <li v-for="tx in filteredTransactions" :key="tx.id"
                class="flex justify-between py-2 border-b last:border-b-0 items-center">
                <template v-if="editingId === tx.id">
                    <div class="flex gap-10 items-center justify-between w-full">
                        <div class="flex gap-4 w-full">
                            <AInput v-model="editDescription" placeholder="Описание" />
                            <AInput v-model="editAmount" type="number" placeholder="Сумма" />
                            <ASelect v-model="editCategory" :options="categoryOptions" />
                        </div>
                        <div class="flex gap-2 flex-shrink-0">
                            <AButton @click="saveEdit(tx.id)">✅</AButton>
                            <AButton @click="cancelEdit">❌</AButton>
                        </div>
                    </div>


                </template>

                <template v-else>
                    <div class="flex gap-10 items-center justify-between w-full">
                        <div class="flex gap-4 w-full">
                            <span>{{ tx.description }}</span>
                            <span :class="tx.type === TransactionType.Income ? 'text-green-500' : 'text-red-500'">
                                {{ tx.type === TransactionType.Income ? '+' : '-' }}{{ tx.amount }} ₽
                            </span>
                        </div>
                        <div class="flex gap-2">
                            <AButton @click="startEdit(tx)">✏️</AButton>
                            <AButton @click="() => financeStore.deleteTransaction(tx.id)">❌</AButton>
                        </div>
                    </div>
                </template>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { type Transaction, TransactionType } from "@/types";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { storeToRefs } from "pinia";
import ASelect from "./ASelect.vue";
import { useFinanceStore } from "@/stores/useFinanceStore";
import AButton from "./AButton.vue";
import AInput from "./AInput.vue";

const props = defineProps<{ transactions: Transaction[] }>();

const financeStore = useFinanceStore();
const { categories } = storeToRefs(useCategoryStore());
const selectedCategory = ref<string>((1).toString());

const categoryOptions = computed(() =>
    categories.value.map(cat => ({ value: cat.id.toString(), label: cat.name }))
);

const filteredTransactions = computed(() => {
    console.log(props.transactions, selectedCategory.value)
    if (!selectedCategory.value) return props.transactions;
    return props.transactions?.filter(tx => tx.categoryId.toString() === selectedCategory.value) || [];
});

const editingId = ref<number | null>(null);
const editDescription = ref<string>("");
const editAmount = ref<number | string>(0);
const editCategory = ref<string>("");

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