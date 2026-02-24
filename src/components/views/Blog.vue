<template>

<div class="bg-neutral-200 grid grid-cols-3 gap-4 items-center">
    <article v-for="article in articles">
        <h1>{{ article.title }}</h1>
        <div>{{ article.content }}</div>
    </article>
</div>

</template>
<script setup lang="ts">
import { API_URL } from '@/network';
import type { Article } from '@/types/articles';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const articles = ref<Article[]>([]);


onMounted(async() => {
    try {
        const req = await axios.get<Article[]>(`${API_URL}/articles`);
        articles.value = req.data;
    } catch (e) {
    }
})

</script>