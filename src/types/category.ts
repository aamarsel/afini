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
    id: number;
};