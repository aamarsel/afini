import { TransactionCategoryType } from "./category";

export enum TransactionType {
    Income = "income",
    Expense = "expense",
}

export interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    description: string;
    categoryId: number;
    date: Date;
}

export const transactionCategoryNames: Record<TransactionCategoryType, string> = {
    [TransactionCategoryType.Salary]: "Зарплата",
    [TransactionCategoryType.Groceries]: "Продукты",
    [TransactionCategoryType.Cafe]: "Кафе",
    [TransactionCategoryType.Transport]: "Транспорт",
    [TransactionCategoryType.Entertainment]: "Развлечения",
    [TransactionCategoryType.Health]: "Здоровье",
    [TransactionCategoryType.Bonus]: "Бонус",
};