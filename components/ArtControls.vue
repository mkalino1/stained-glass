<template>
  <div class="flex gap-4 justify-center">
    <button @click="$emit('undoHistory')" :disabled="canUndo" class="mr-2">Undo</button>
    <button @click="$emit('redoHistory')" :disabled="canRedo">Redo</button>
    <input v-model.number="resolution" />
    <input type="checkbox" v-model="bloatMode" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ canUndo: boolean, canRedo: boolean }>()
defineEmits<{ undoHistory: [], redoHistory: [] }>()
const bloatMode = defineModel('bloatMode')
const resolution = defineModel('resolution')
</script>