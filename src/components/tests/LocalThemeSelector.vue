<!-- Ce composant permet de tester watch/onUnmounted -->
<template>
    <div class="flex flex-col">
        <h2>Selection de thème local</h2>
        <div class="flex items-center gap-4">
            <div v-for="theme in availableThemes" @click="localTheme = theme"
                class="py-2 cursor-pointer px-4 text-neutral-content" :style="{
                    background: theme.color,
                    opacity: theme == localTheme ? '' : '40%'
                }">
                <span>{{ theme.name }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

type Theme = {
    name: string;
    color: string;
}

const localTheme = ref<Theme | null>(null);

const availableThemes = ref<Theme[]>([
    {
        name: "crimson",
        color: "var(--crimson-strong)"
    },
    {
        name: "vyridian",
        color: "var(--vyridian-strong)"
    },
])

watch(() => localTheme.value, () => {
    if (!localTheme.value)
        return;

    document.documentElement.dataset.theme = localTheme.value.name;
}, {
    immediate: true
});

onUnmounted(() => {
    let oldTheme = localStorage.getItem('theme') ?? "vyridian";
    document.documentElement.dataset.theme = oldTheme;
});
</script>