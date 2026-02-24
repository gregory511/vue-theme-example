<template>
    <div class="w-full lg:w-150
            h-10
            flex items-start
            bg-neutral
            relative"
        >
        <div class="bg-primary h-full"
        :style="{
            width: fillPercentage + '%'
        }"></div>

        <p class="absolute 
            font-bold text-primary-content 
            left-1/2 -translate-x-1/2
            top-1/2 -translate-y-1/2">
            {{ fillPercentage }}%
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    value?: number;
    max  ?: number;
}>(), {
    value: 50,
    max  : 100
});

const fillPercentage = computed(() => {
    // pas de division par zéro...
    if (props.max === 0)
        return 0;

    return props.value / props.max * 100;
})

</script>