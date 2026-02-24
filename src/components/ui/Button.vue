<template>
    <button  v-bind="attrs"
        class="
            border-0
            transition-transform
            hover:brightness-110
            rounded-sm
            cursor-pointer
            px-4 py-2"
        :class="[ classList, attrs.class]"
    >
        <slot/>
    </button>
</template>
<script setup lang="ts">
import { computed, useAttrs } from 'vue';

type ButtonProps = {
    variant?: "primary" | "secondary"
};

const props = withDefaults(defineProps<ButtonProps>(), {
    variant: "primary"
});

const classList = computed(() => {
    if (props.variant === 'primary')
        return [ 'bg-primary text-primary-content' ];
    else
        return [ 'bg-secondary text-secondary-content' ];
})

const attrs = useAttrs();
</script>