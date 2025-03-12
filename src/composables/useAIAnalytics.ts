import { ref, watchEffect } from "vue";
import { getCategoryNameFromCategoryId } from "@/utils";
import { type TransactionCategory, type Transaction } from "@/types";
import { storeToRefs } from "pinia";
import { useFinanceStore } from "@/stores/useFinanceStore";
import { useCategoryStore } from "@/stores/useCategoryStore";

const AI_API_URL = "http://localhost:11434/api/generate";

function formatTransactionsForAI(transactions: Transaction[], categories: TransactionCategory[]): string {
    return JSON.stringify(
        transactions.map(tx => ({
            id: tx.id,
            type: tx.type,
            amount: tx.amount,
            description: tx.description,
            category: getCategoryNameFromCategoryId(tx.categoryId, categories),
            date: tx.date.toISOString(),
        })),
        null,
        2
    );
}

async function sendToAI(prompt: string): Promise<string> {
    const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "deepseek-v2",
            prompt,
            stream: false,
        }),
    });

    const data = await response.json();
    return data.response;
}

export function useAIAnalytics() {
    const aiAnalysis = ref<string>("");
    const userPrompt = ref<string>("");
    const userResponse = ref<string>("");

    const financeStore = useFinanceStore();
    const categoryStore = useCategoryStore();
    
    const { transactions } = storeToRefs(financeStore);
    const { categories } = storeToRefs(categoryStore);

    const formattedTransactions = ref("");

    async function analyzeTransactions() {
        if (!formattedTransactions.value) return;
        const prompt = `Ты финансовый аналитик, который является встроенным ИИ-помощником в модном приложении для учета финансов. Проанализируй мои расходы и доходы, найди паттерны и дай рекомендации СТРОГО НА АНГЛИЙСКОМ языке. Можешь вставлять ироничные шуточки по поводу странных и необычных трат человека. Вот данные:\n\n${formattedTransactions.value}`;
        aiAnalysis.value = await sendToAI(prompt);
    }

    async function sendUserPrompt() {
        const prompt = `Ты финансовый аналитик, который является встроенным ИИ-помощником в модном приложении для учета финансов. Отвечай СТРОГО НА РУССКОМ ЯЗЫКЕ. Пользователь задает запрос: ${userPrompt.value}\n\nВот его данные:\n${formattedTransactions.value}`;
        userResponse.value = await sendToAI(prompt);
    }

    // Отслеживаем изменения в транзакциях и пересчитываем формат
    watchEffect(() => {
        if (transactions.value.length && categories.value.length) {
            formattedTransactions.value = formatTransactionsForAI(transactions.value, categories.value);
            analyzeTransactions(); // Запускаем анализ при обновлении данных
        }
    });

    return { aiAnalysis, userPrompt, userResponse, sendUserPrompt };
}