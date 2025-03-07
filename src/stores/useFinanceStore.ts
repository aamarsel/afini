import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Transaction, TransactionType } from '@/types/finance';

export const useFinanceStore = defineStore('finance', () => {
	const balance = ref(12500);
	const transactions = ref<Transaction[]>([
		{ id: 1, type: TransactionType.Income, amount: 5000, description: 'Зарплата' },
		{ id: 2, type: TransactionType.Expense, amount: 1500, description: 'Продукты' },
		{ id: 3, type: TransactionType.Expense, amount: 2000, description: 'Кафе' },
	]);

	const addTransaction = (type: TransactionType, amount: number, description: string) => {
		transactions.value.push({
			id: Date.now(),
			type,
			amount,
			description,
		});

		if (type === TransactionType.Income) {
			balance.value += amount;
		} else {
			balance.value -= amount;
		}
	};

	return {
		balance,
		transactions,
		addTransaction,
	};
});