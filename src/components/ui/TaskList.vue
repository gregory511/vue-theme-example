<template>
   <div class="flex flex-col" :style="{
      marginLeft: (props.depth * 40) + 'px'
   }">
      <template v-for="task, i in tasks" :key="`task_${i}`">
         <Checkbox v-model="task.done" :text="task.name"/> 
         <div class="flex flex-col my-1">
            <TaskList v-if="task.tasks"
               :tasks="task.tasks"
               :depth="props.depth + 1"/>
         </div>
      </template>
   </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task';
import Checkbox from './Checkbox.vue';

const props = withDefaults(defineProps<{
   tasks?: Task[] | null,
   depth?: number
}>(), {
   depth: 0,
   tasks: null,
});
</script>

