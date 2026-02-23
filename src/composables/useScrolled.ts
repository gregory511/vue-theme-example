// Ce fichier permet de savoir si la page est scroll pour afficher les effets associés.

import { ref, onMounted, onUnmounted } from 'vue'

export function useScrolled(threshold: number = 20) {
    const isScrolled = ref<boolean>(false);

    const onScroll = () => {
        isScrolled.value = window.scrollY > threshold;
    }

    onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
    onUnmounted(() => window.removeEventListener('scroll', onScroll));

    return { isScrolled }
}