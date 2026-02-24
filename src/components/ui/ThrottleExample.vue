<template>

    <div class="flex flex-col gap-1">
        <h2>Test throttle / debounce</h2>

        <div class="flex items-center gap-4">

            <div class="flex flex-col">
                <label for="delay">Méthode</label>
                <select v-model="timingFn">
                    <option :value="AllowedModes.debounce">Debounce</option>
                    <option :value="AllowedModes.throttle">Throttle</option>
                </select>
            </div>

            <div class="flex flex-col">
                <label for="delay">Délai</label>
                <Input type="number" class="w-30" id="delay" v-model="delay" />
            </div>

            <div class="flex flex-col grow">
                <label for="delay">Recherche</label>
                <Input type="text" v-model="textInput" @update:model-value="changedFn" />
            </div>
        </div>
        <p>Nombre d'appels à l'API : {{ callCount }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from './Input.vue';
import { throttle, debounce } from '@/utils/timing';

enum AllowedModes {
    "throttle", "debounce"
};

const callCount = ref<number>(0);
const textInput = ref<string>("");
const delay     = ref<number>(1500);
const timingFn  = ref<AllowedModes>(AllowedModes.throttle);


const onValueChange = (value: string) => {
    callCount.value++;
}

const applyMethod = ( ) : void => {
    if (delay.value < 10)
        return;

    const fn = timingFn.value === AllowedModes.debounce ? debounce : throttle;
    changedFn =  fn(onValueChange, delay.value);
};

let changedFn = throttle(onValueChange, delay.value);

watch(() => delay.value, () => {
    applyMethod();
});

watch(() => timingFn.value, () => {
    applyMethod();
});
</script>