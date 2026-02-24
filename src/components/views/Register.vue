<template>
    <h1>Inscription</h1>

    <form @submit.prevent="onFormSubmit" class="flex flex-col gap-3 items-start">
        <input required type="text" v-model="credentials.username" placeholder="utilisateur">
        <input required type="password" v-model="credentials.password" placeholder="Mot de passe">

        <div v-if="registerError"
            class="bg-warning p-4 text-neutral-content"
        >
            Une erreur s'est produite lors de la création du compte.
        </div>

        <button role="submit">Valider</button>
    </form>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { UserCredentials } from '@/types/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const credentials = ref<UserCredentials>({
    username: "",
    password: "",
});

const registerError = ref<boolean>(false);

const userStore = useUserStore();
const router = useRouter();

const onFormSubmit = async (event: Event) => {
    const registerSuccesful = await userStore.attemptRegister(credentials.value);
    registerError.value = !registerSuccesful;
    
    if (!registerSuccesful)
        return;

    router.push({
        name: 'home'
    });
};

onMounted(async () => {
   
}); 
</script>