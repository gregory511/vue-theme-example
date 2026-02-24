<template>
    <AppHeader />
    <main class="w-full lg:w-[calc(var(--main-width))]
        grow
        px-[var(--header-padding)] py-4 lg:py-8
        lg:ml-[calc(50%-var(--main-width)/2)]
        flex flex-col
        items-start
    ">
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