<template>
    <div class="hidden lg:flex items-center gap-2">
        <button 
            v-for="t in themes" :key="t.value"
            class="w-8 h-8 rounded-full cursor-pointer opacity-40 transition-opacity duration-300"
            :class="{ 'border-2 border-black/40 opacity-100 ': theme === t.value }"
            :style="{ 'background': t.color }" 
            :title="t.label" 
            :aria-pressed="theme === t.value"
            @click="theme = t.value"
        />
    </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme } = useTheme();

const themes = [
    { value: 'cerulean', label: 'Cerulean', color: 'oklch(54% 0.20 230)' },
    { value: 'vyridian', label: 'Vyridian', color: 'oklch(55% 0.20 160)' },
    { value: 'crimson', label: 'Crimson', color: 'oklch(51% 0.26 15)' },
    { value: 'aurum', label: 'Aurum', color: 'oklch(63% 0.24 80)' },
]
</script>