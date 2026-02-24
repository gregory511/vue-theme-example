<template>
    <footer class="bg-base-300 bg-base-200 border-t border-base-300 flex justify-center">
        <div class="flex items-center justify-between py-4 h-14">


            <div v-if="userStore.user">
                Bonjour, {{ userStore.user.username }} !
            </div>

            <span class="font-display">Demo ESGI 2026</span>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>