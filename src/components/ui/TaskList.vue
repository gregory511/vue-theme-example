<template>
    <div class="flex flex-col" :style="{ marginLeft: depth * 40 + 'px' }">
        <template v-for="task in tasks" :key="task.id ?? task.name">
            <Checkbox v-model="task.done"
            :text="task.name" 
            @change="onCheckboxChange(task)" />

            <div v-if="task.tasks?.length" class="flex flex-col my-1">
                <TaskList :tasks="task.tasks" :depth="depth + 1" />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';
import Checkbox from './Checkbox.vue';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        tasks?: Task[] | null
        depth?: number
    }>(),
    {
        tasks: null,
        depth: 0,
    }
);

type TaskProgress = {
    done: number
    total: number
}
/**
 * Mise à jour des enfants lorsque la checkbox
 * est mise à jour
 */
const onCheckboxChange = (task: Task) => {
    if (!task.tasks?.length)
        return;

    updateChildren(task.tasks, task.done);
}

const updateChildren = (tasks: Task[], value: boolean) => {
    for (const t of tasks) {
        t.done = value;
        if (t.tasks?.length) {
            updateChildren(t.tasks, value);
        }
    }
}

const calculateProgress = (tasks: Task[]): TaskProgress => {
    let done  = 0;
    let total = 0;

    for (const task of tasks) {
        if (task.tasks?.length) {
            const child = calculateProgress(task.tasks);
            done += child.done;
            total += child.total;
        } else {
            total++;
            if (task.done)
                done++;
        }
    }

    return { done, total };
}

const getProgress = computed((): number => {
    if (!props.tasks?.length)
        return 0;

    const { done, total } = calculateProgress(props.tasks);
    
    // Evitons la division par zéro...
    if (total === 0)
        return 0;
    
    return Math.round((done / total) * 100);
})

defineExpose({
    getProgress
})
</script>