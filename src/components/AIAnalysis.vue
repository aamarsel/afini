<template>
    <div class="flex flex-col items-center gap-4">
        <NText>{{ aiAnalysis }}</NText>

        <NInput type="textarea" v-model:value="userPrompt" placeholder="Введите вопрос..." />
        <NButton @click="sendUserPrompt">Отправить</NButton>

        <NText v-if="userResponse">Ответ: {{ userResponse }}</NText>
    </div>
</template>
<script setup lang="ts">
import { useAIAnalytics } from "@/composables/useAIAnalytics";
import { NInput, NButton, NText } from "naive-ui";

const { aiAnalysis, userPrompt, userResponse, sendUserPrompt } = useAIAnalytics();
</script>