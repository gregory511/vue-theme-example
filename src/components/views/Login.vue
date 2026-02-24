<template>
    <h1>Connexion</h1>

    <form @submit.prevent="onFormSubmit" class="flex flex-col gap-3 items-start">
        <input required type="text" v-model="credentials.username" placeholder="utilisateur">
        <input required type="password" v-model="credentials.password" placeholder="Mot de passe">

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

const userStore = useUserStore();
const router = useRouter();

const onFormSubmit = async (event: Event) => {
    const data = await userStore.attemptLogin(credentials.value);
    if (data !== null) {
        router.push({ name: "home" });
    }
};

onMounted(async () => {

}); 
</script>