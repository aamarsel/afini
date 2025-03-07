export enum TransactionType {
    Income = "income",
    Expense = "expense",
}


export enum TransactionCategoryType {
    Salary = "salary",
    Groceries = "groceries",
    Cafe = "cafe",
    Transport = "transport",
    Entertainment = "entertainment",
    Health = "health",
    Bonus = "bonus",
}

export type TransactionCategory = {
    type: TransactionCategoryType;
    name: string;
};

export interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    description: string;
    category?: TransactionCategoryType;
}