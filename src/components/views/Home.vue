<template>
    <div class="flex flex-col gap-4">

        <h1>Bienvenue sur cette Demo !</h1>

        <LocalThemeSelector></LocalThemeSelector>

        <ProgressBar :value="taskListProgress"></ProgressBar>

        <TaskList class="mt-4" ref="taskList" :tasks="taskData"></TaskList>
    </div>
</template>


<script setup lang="ts">
import type { Task } from '@/types/task';
import TaskList from '@/components//ui/TaskList.vue';
import { computed, ref } from 'vue';
import { tasks } from '@/data/tasks';
import ProgressBar from '../ui/ProgressBar.vue';
import LocalThemeSelector from '../tests/LocalThemeSelector.vue';

type TaskListInstance = InstanceType<typeof TaskList>

const taskData = ref<Task[]>(tasks);
const taskList = ref<TaskListInstance | null>(null);

const taskListProgress = computed((): number => {
    if (taskList.value === null)
        return 0;

    return taskList.value.getProgress;
})

</script>