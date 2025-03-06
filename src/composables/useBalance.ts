import { useFinanceStore } from '@/stores/useFinanceStore';
import { TransactionType } from '@/types/finance';

export const useBalance = () => {
    const financeStore = useFinanceStore();

    const addTransaction = (type: TransactionType, amount: number, description: string) => {
        financeStore.addTransaction(type, amount, description);
    };

    return {
        addTransaction,
    };
};