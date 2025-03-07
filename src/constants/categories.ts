import { type TransactionCategory, TransactionCategoryType } from "@/types/finance";

export const categories: TransactionCategory[] = [
    { type: TransactionCategoryType.Salary, name: "Зарплата" },
    { type: TransactionCategoryType.Groceries, name: "Продукты" },
    { type: TransactionCategoryType.Cafe, name: "Кафе" },
    { type: TransactionCategoryType.Transport, name: "Транспорт" },
    { type: TransactionCategoryType.Entertainment, name: "Развлечения" },
    { type: TransactionCategoryType.Health, name: "Здоровье" },
    { type: TransactionCategoryType.Bonus, name: "Бонус" },
];