import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Transaction, TransactionType, TransactionCategoryType } from '@/types/finance';

export const useFinanceStore = defineStore('finance', () => {
	const balance = ref(12500);
	const transactions = ref<Transaction[]>([
		{ id: 1, type: TransactionType.Income, amount: 5000, description: 'Зарплатонька пришла!', category: TransactionCategoryType.Salary },
		{ id: 2, type: TransactionType.Expense, amount: 1500, description: 'Продукты хаваем', category: TransactionCategoryType.Groceries },
		{ id: 3, type: TransactionType.Expense, amount: 2000, description: 'Кафе жи есть', category: TransactionCategoryType.Cafe },
	]);

	const addTransaction = ({type, amount, description, category}: Omit<Transaction, 'id'>) => {
		transactions.value.push({
			id: Date.now(),
			type,
			amount,
			description,
			category,
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