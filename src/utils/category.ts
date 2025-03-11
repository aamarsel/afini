import type { TransactionCategory } from "@/types";

export const getCategoryNameFromCategoryId = (categoryId: number, categories: TransactionCategory[]): TransactionCategory['name'] | undefined => {
    return categories.find(category => category.id === categoryId)?.name
}