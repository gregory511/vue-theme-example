<template>

    <div class="w-full flex justify-center">
        <div class="grid grid-cols-1 lg:grid-cols-2
    w-full lg:max-w-3/4
    gap-4 items-start justify-stretch">
            <article v-for="article in articles"
                class="bg-neutral-100 flex flex-col
                items-start
                    min-h-full p-6 gap-y-4">
                <h1 class="text-primary">{{ article.title }}</h1>
                <p class="grow">{{ article.description }}</p>
                <Button class="self-end justify-self-end mt-4"
                    @click="$router.push({ name: 'blog.article', params: { articleId: article.id }})"
                >Lire l'article</Button>
            </article>
        </div>
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

onMounted(async () => {
    try {
        const req = await axios.get<Article[]>(`${API_URL}/articles`, {
            headers: userStore.bearerHeader()
        });
        articles.value = req.data;
    } catch (e) {
    }
})

</script>