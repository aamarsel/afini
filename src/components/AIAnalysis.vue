<template>
    <div>
        <h2>Анализ AI</h2>
        <p>{{ aiAnalysis }}</p>

        <ATextarea v-model="userPrompt" placeholder="Введите вопрос..." />
        <AButton @click="sendUserPrompt">Отправить</AButton>

        <p v-if="userResponse">Ответ: {{ userResponse }}</p>
    </div>
</template>
<script setup lang="ts">
import { useAIAnalytics } from "@/composables/useAIAnalytics";
import ATextarea from "@/components/ATextarea.vue";
import AButton from "@/components/AButton.vue";

const { aiAnalysis, userPrompt, userResponse, sendUserPrompt } = useAIAnalytics();
</script>