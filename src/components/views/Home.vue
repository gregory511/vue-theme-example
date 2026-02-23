<template>
    <h1>Bienvenue sur cette Demo !</h1>

    <code>
test
    </code>
    <TaskList :tasks="tasks"></TaskList>
</template>


<script setup lang="ts">
import type { Task } from '@/types/task';
import TaskList from '@/components//ui/TaskList.vue';
import { reactive } from 'vue';

const tasks = reactive<Task[]>([
    {
        done: false,
        name: "Tâches domestiques",
        tasks: [
            {
                done: false,
                name: "Laver les carreaux"
            },
            {
                done: true,
                name: "Faire la vaisselle"
            },
            {
                done: true,
                name: "Peinture",
                tasks: [
                    {
                        done: true,
                        name: "Salle de bain"
                    },
                    {
                        done: true,
                        name: "Chambre"
                    },
                ]
            },
            {
                done: true,
                name: "Repasser les chemises"
            },
        ]
    },

    {
        done: false,
        name: "Courses"
    },
]);
</script>