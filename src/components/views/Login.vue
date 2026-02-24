<template>
    <h1>Connexion</h1>

    <p>Identifiants par défaut : admin/password</p>
    <p>Pensez à démarrer le serveur Python</p>

    <form @submit.prevent="onFormSubmit" class="flex flex-col gap-3 items-start">
        <Input required type="text" v-model="credentials.username" placeholder="Utilisateur"/>
        <Input required type="password" v-model="credentials.password" placeholder="Mot de passe"/>
        <Button role="submit">Valider</Button>
    </form>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { UserCredentials } from '@/types/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from '../ui/Input.vue';
import Button from '../ui/Button.vue';

const credentials = ref<UserCredentials>({
    username: "admin",
    password: "password",
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