<template>
    <AppHeader />
    <main>
        <RouterView v-slot="{ Component }">
            <Transition name="page" mode="out-in">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </main>
    <AppFooter />
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
    opacity: 0;
    transform: translateY(6px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>