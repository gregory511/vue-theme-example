<template>

    <div class="flex flex-col gap-3">
        <h1>Test throttle / debounce</h1>

        <p>Throttle et debounce sont des fonctions permettant de <strong>limiter les appels de fonction</strong> grâce un timer.</p>
        
        <p>Ces fonctions sont indispensables pour des barres de recherche, pour éviter de saturer l'API lorsque l'utilisateur décide de marteler son clavier (et de le bloquer au passage).</p>
        
        <p><strong>Throttle</strong> exécute initialement l'évènement, et nécessite d'attendre au moins <i>n</i> ms avant d'exécuter le suivant.</p>
        <p><strong>Debounce</strong> attend <i>n</i> ms à chaque input avant de déclencher l'évènement. Tant que l'utilisateur ne laisse pas le délai s'écouler, une fonction n'est appelée.</p>

        <div class="flex items-center gap-4">

            <div class="flex flex-col">
                <label for="delay">Méthode</label>
                <select v-model="timingFn">
                    <option :value="TimingMode.none">Aucune</option>
                    <option :value="TimingMode.debounce">Debounce</option>
                    <option :value="TimingMode.throttle">Throttle</option>
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
        <p>Nombre d'appels fictifs à l'API : {{ callCount }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { throttle, debounce } from '@/utils/timing';
import Input from '../ui/Input.vue';

enum TimingMode {
    "throttle", "debounce", "none"
};

const callCount = ref<number>(0);
const textInput = ref<string>("");
const delay     = ref<number>(1500);
const timingFn  = ref<TimingMode>(TimingMode.throttle);


const onValueChange = (_value: string) => {
    callCount.value++;
}

const applyMethod = () : void => {
    if (delay.value < 10)
        return;

    switch (timingFn.value) {
        case TimingMode.none:
            changedFn = onValueChange;
            break;
        case TimingMode.debounce:
            changedFn = debounce(onValueChange, delay.value);
            break;
        case TimingMode.throttle:
            changedFn = throttle(onValueChange, delay.value);
            break
    }
};

let changedFn = throttle(onValueChange, delay.value);

watch(() => delay.value, () => {
    applyMethod();
});

watch(() => timingFn.value, () => {
    applyMethod();
});
</script>