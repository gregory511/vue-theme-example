<template>
    <label class="inline-flex items-center gap-2 cursor-pointer select-none">
        
        <!--
            Input pour l'accessibilité plutôt qu'une div
            sr = screen-reader, permet d'afficher la coche pour 
            les utilisateurs malvoyants
        -->
        <input type="checkbox" v-model="model" class="sr-only peer" @change="emitChange" />

        <!-- 
            peer-checked est une classe spéciale tailwind
            qui permet d'appliquer un style si un autre item
            nommé peer est actif ou non (le nom est paramétrable)

            https://tailwindcss.com/docs/hover-focus-and-other-states
        -->

        <div class="flex shrink-0 items-center justify-center 
            w-4 h-4    
            rounded-sm border-[1.5px]
            bg-base-100 border-base-300
            peer-checked:bg-primary 
            peer-checked:border-primary 
            peer-checked:text-primary-content">

            <!-- Transition pour l'animation de la checkbox -->
            <Transition name="check">
                <svg v-if="model" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-[0.65rem] h-[0.65rem]">
                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </Transition>
        </div>

        <span class="font-body text-sm text-base-content">
            {{ text }}
        </span>
    </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
const props = defineProps<{
    text: string
}>();

const emit = defineEmits<{
    (e: "change", value: boolean): void,
}>();

const emitChange = () => {
    if (model.value != null) {
        emit("change", model.value);
    }
}
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