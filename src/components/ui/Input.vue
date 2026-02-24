<template>
    <input v-bind="attrs" :value="props.modelValue" @input="updateValue" class="
      bg-primary/35 text-primary-content
      border-0
      rounded-sm
      px-3 py-2" :class="attrs.class" />
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

interface Props {
    modelValue?: any 
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
}>();

const attrs = useAttrs();

const updateValue = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
}

</script>