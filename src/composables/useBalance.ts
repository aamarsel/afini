import { useFinanceStore } from '@/stores/useFinanceStore';
import { type Transaction } from '@/types';

export const useBalance = () => {
    const financeStore = useFinanceStore();

    const addTransaction = ({
        type, 
        amount, 
        description,
        categoryId,
    }: Omit<Transaction, 'id'>) => {
        financeStore.addTransaction({type, amount, description, categoryId});
    };

    return {
        addTransaction,
    };
};