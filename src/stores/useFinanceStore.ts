import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Transaction, TransactionType, TransactionCategoryType } from '@/types';

export const useFinanceStore = defineStore('finance', () => {
	const balance = ref(12500);
	const transactions = ref<Transaction[]>([
		{ id: 1, type: TransactionType.Income, amount: 5000, description: 'Зарплатонька пришла!', categoryId: 1 },
		{ id: 2, type: TransactionType.Expense, amount: 1500, description: 'Продукты хаваем', categoryId: 2 },
		{ id: 3, type: TransactionType.Expense, amount: 2000, description: 'Кафе жи есть', categoryId: 3 },
	]);

	const addTransaction = ({type, amount, description, categoryId}: Omit<Transaction, 'id'>) => {
		console.log('Adding transaction', type, amount, description, categoryId);
		transactions.value.push({
			id: Date.now(),
			type,
			amount,
			description,
			categoryId,
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