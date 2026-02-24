<template>
    <BackArrow></BackArrow>
    <article class="flex flex-col gap-4" v-if="article">
        <h1 class="text-primary">{{ article.title }}</h1>
        <p>
            {{ article.content }}
        </p>
    </article>
</template>
<script setup lang="ts">
import { API_URL } from '@/network';
import { useUserStore } from '@/stores/userStore';
import type { Article } from '@/types/articles';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import BackArrow from '../ui/BackArrow.vue';

const props = defineProps<{
    articleId: number
}>();

const article = ref<Article | null>(null);
const user = useUserStore();

onMounted(async () => {
    try {
        const data = await axios.get<Article>(`${API_URL}/articles/${props.articleId}`, {
            headers: user.bearerHeader()
        });
        article.value = data.data;
    } catch {

    }
});

</script>