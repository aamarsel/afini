<template>
    <ACard title="Текущий баланс:">
        <span class="text-green-500">{{ balance }} ₽</span>
        <div class="flex gap-4 mt-4">
            <AButton :color="AColor.Green" text="➕ Доход"
                @click="emit('add-transaction', TransactionType.Income, 1000, 'Бонус')" />
            <AButton :color="AColor.Red" text="➖ Расход"
                @click="emit('add-transaction', TransactionType.Expense, 500, 'Кофе')" />
        </div>
    </ACard>
</template>
<script setup lang="ts">
import ACard from "@/components/ACard.vue";
import AButton from "@/components/AButton.vue";
import { AColor } from "@/types/common";
import { TransactionType } from "@/types/finance";

defineProps<{
    balance: number;
}>();

const emit = defineEmits(["add-transaction"]);
</script>
