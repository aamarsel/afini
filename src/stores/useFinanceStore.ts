import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { type Transaction, TransactionType } from '@/types';
import { openDB, STORE_TRANSACTIONS } from "@/db";
import { dbRequest, addToStore, deleteFromStore, updateStore } from '@/db/utils';

export const useFinanceStore = defineStore('finance', () => {
	const balance = ref<number>(0);
	const transactions = ref<Transaction[]>([]);

	const loadTransactions = async () => {
		const db = await openDB();
		const store = db.transaction(STORE_TRANSACTIONS, "readonly").objectStore(STORE_TRANSACTIONS);

		transactions.value = await dbRequest(store.getAll());
	};

	const notifyUpdate = () => {
		localStorage.setItem("transactionsUpdated", Date.now().toString());
	};

	const addTransaction = async (transaction: Omit<Transaction, "id">) => {
		const db = await openDB();
		const newTransaction: Transaction = { id: Date.now(), ...transaction };
		console.log(transaction)

		await addToStore(db, STORE_TRANSACTIONS, newTransaction);
		await loadTransactions(); 
		notifyUpdate();
	};

	const deleteTransaction = async (id: number) => {
		const db = await openDB();

		await deleteFromStore(db, STORE_TRANSACTIONS, id);
		await loadTransactions();
		notifyUpdate();
	};
	
	const updateTransaction = async (transaction: Partial<Transaction>) => {
		const db = await openDB();

		await updateStore(db, STORE_TRANSACTIONS, transaction);
		await loadTransactions();
		notifyUpdate();
	}

	window.addEventListener("storage", (event) => {
		if (event.key === "transactionsUpdated") {
			loadTransactions();
		}
	});

	openDB().then((db) => {
		db.onversionchange = () => {
			loadTransactions();
		};
	});

	watch(transactions, (newTransactions) => {
        balance.value = newTransactions.reduce(
            (acc, tx) => acc + (tx.type === TransactionType.Income ? tx.amount : -tx.amount),
            0
        );
    }, { deep: true });

	loadTransactions();

	return {
		balance,
		transactions,
		addTransaction,
		deleteTransaction,
		updateTransaction,
	};
});