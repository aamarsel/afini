import { useFinanceStore } from '@/stores/useFinanceStore';
import { type Transaction } from '@/types/finance';

export const useBalance = () => {
    const financeStore = useFinanceStore();

    const addTransaction = ({
        type, 
        amount, 
        description,
        category,
    }: Omit<Transaction, 'id'>) => {
        financeStore.addTransaction({type, amount, description, category});
    };

    return {
        addTransaction,
    };
};