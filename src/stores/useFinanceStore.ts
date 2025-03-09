import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Transaction, TransactionType } from '@/types';
import { openDB, STORE_TRANSACTIONS } from "@/db";
import { dbRequest, addToStore } from '@/db/utils';

export const useFinanceStore = defineStore('finance', () => {
	const balance = ref<number>(0);
	const transactions = ref<Transaction[]>([]);

	const loadTransactions = async () => {
		const db = await openDB();
		const store = db.transaction(STORE_TRANSACTIONS, "readonly").objectStore(STORE_TRANSACTIONS);

		transactions.value = await dbRequest(store.getAll());
		balance.value = transactions.value.reduce(
			(acc, tx) => acc + (tx.type === TransactionType.Income ? tx.amount : -tx.amount),
			0
		);
	};

	const addTransaction = async (transaction: Omit<Transaction, "id">) => {
		const db = await openDB();
		const newTransaction: Transaction = { id: Date.now(), ...transaction };

		await addToStore(db, "transactions", newTransaction);
		await loadTransactions(); 
	};

	loadTransactions();

	return {
		balance,
		transactions,
		addTransaction,
	};
});