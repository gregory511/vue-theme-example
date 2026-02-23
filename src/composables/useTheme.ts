import { ref, watchEffect } from 'vue'

const theme = ref(localStorage.getItem('theme') ?? 'aurum');
document.documentElement.dataset.theme = theme.value;

export function useTheme() {

    // Code exécuté dès changement du thème
    watchEffect(() => {
        document.documentElement.dataset.theme = theme.value;
        localStorage.setItem('theme', theme.value);
    })

    return { theme };
}