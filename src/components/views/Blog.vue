<template>

<div class="bg-neutral-200 grid grid-cols-3 gap-4 items-center">
    <article v-for="article in articles">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <Button class="align-self-end">Lire l'article</Button>
    </article>
</div>

</template>
<script setup lang="ts">
import { API_URL } from '@/network';
import type { Article } from '@/types/articles';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Button from '../ui/Button.vue';
import { useUserStore } from '@/stores/userStore';

const articles = ref<Article[]>([]);
const userStore = useUserStore();

onMounted(async() => {
    try {
        const req = await axios.get<Article[]>(`${API_URL}/articles`, {
            headers: userStore.bearerHeader()
        });
        articles.value = req.data;
    } catch (e) {
    }
})

</script>