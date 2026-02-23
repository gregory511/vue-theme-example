<template>
    <div class="inline-flex items-center gap-2 cursor-pointer select-none" @click="model = !model">
        <div class="w-[1.1rem] h-[1.1rem] shrink-0 flex items-center justify-center rounded-sm border-[1.5px] transition-colors duration-150"
            :class="model
                ? 'bg-primary border-primary text-primary-content'
                : 'bg-base-100 border-base-300'
                ">
            <Transition name="check">
                <svg v-if="model" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-[0.65rem] h-[0.65rem]">
                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </Transition>
        </div>

        <label class="font-body text-sm text-base-content cursor-pointer">
            {{ props.text }}
        </label>
    </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
const props = defineProps<{ 
    text: string;
}>();
</script>

<style>
.check-enter-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.check-enter-from {
    opacity: 0;
    transform: scale(0.5);
}
</style>