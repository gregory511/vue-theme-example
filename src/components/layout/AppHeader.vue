<template>
    <header class="app-header" :class="{ 'scrolled': isScrolled }">
        <div class="header-inner">

            <RouterLink to="/" class="logo">
                <span class="logo-name">Demo ESGI</span>
            </RouterLink>

            <nav class="nav" aria-label="Main navigation">
                <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" class="nav-link">
                    {{ link.label }}
                </RouterLink>
            </nav>

            <div class="header-end">
                <ThemeSwitcher />

                <button class="hamburger" :class="{ 'is-open': menuOpen }" @click="menuOpen = !menuOpen">
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </div>

        <Transition name="mobile-menu">
            <div v-if="menuOpen" class="mobile-menu">
                <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" class="mobile-link"
                    @click="menuOpen = false">
                    {{ link.label }}
                </RouterLink>
            </div>
        </Transition>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'
import { useScrolled } from '@/composables/useScrolled'

const { isScrolled } = useScrolled()
const menuOpen = ref(false)

const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/test', label: 'Test' },
    { to: '/about', label: 'A propos' },
    { to: '/contact', label: 'Contact' },
]
</script>

<style scoped>
.app-header {
    position        : sticky;
    top             : 0;
    z-index         : 100;
    background-color: var(--color-base-100);
    border-bottom   : 1px solid transparent;
    transition: border 0.4s ease;
}

.app-header.scrolled {
    border-bottom-color: var(--color-border);
    box-shadow: var(--shadow-sm);
}

.header-inner {
    display: flex;
    align-items: center;
    gap: 2rem;
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 2rem;
    height: 4rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.25rem;
    color: var(--color-text-base);
    letter-spacing: 0.01em;
    flex-shrink: 0;
}

.logo-mark {
    color: var(--color-primary);
    font-size: 1.1rem;
}

.nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
}

.nav-link {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-base-content);
    text-decoration: none;
    padding: 0.4rem 0.75rem;
    border-radius: var(--radius-md);
    transition: color 0.15s ease, background-color 0.15s ease;
}

.nav-link:hover {
    color: var(--color-text-base);
    background-color: var(--color-base-200);
}

.nav-link.router-link-active {
    color: var(--color-primary);
    background-color: var(--color-base-100);
}

.header-end {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
}

.hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 2rem;
    height: 2rem;
    border: none;
    cursor: pointer;
    padding: 0;
}

.hamburger span {
    display: block;
    height: 1.5px;
    width: 100%;
    background-color: var(--color-base-content);
    transform-origin: center;
    transition: transform 0.25s ease, opacity 0.2s ease;
}

.hamburger.is-open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
}

.hamburger.is-open span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
}

.hamburger.is-open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
}

.mobile-menu {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-border);
    background-color: var(--color-surface);
    padding: 0.75rem 2rem 1.25rem;
    gap: 0.25rem;
}

.mobile-link {
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-base-content);
    text-decoration: none;
    padding: 0.6rem 0.5rem;
    border-radius: var(--radius-md);
    transition: color 0.15s ease, background-color 0.15s ease;
}

.mobile-link:hover,
.mobile-link.router-link-active {
    color: var(--color-primary);
    background-color: var(--color-surface-raised);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

@media (max-width: 768px) {
    .nav {
        display: none;
    }

    .hamburger {
        display: flex;
    }
}
</style>