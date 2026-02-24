<template>
    <AppHeader />
    <main>
        <RouterView v-slot="{ Component }">
            <component :is="Component" />
        </RouterView>
    </main>
    <AppFooter />
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>