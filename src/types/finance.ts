export enum TransactionType {
    Income = 'income', 
    Expense = 'expense'
}

export interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    description: string;
}