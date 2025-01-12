<template>
  <div class="flex gap-4 justify-center">
    <button @click="$emit('undoHistory')" :disabled="historyIndex <= 0" class="mr-2">Undo</button>
    <button @click="$emit('redoHistory')" :disabled="historyIndex >= history.length - 1">Redo</button>
    <input v-model.number="resolution" />
    <input type="checkbox" v-model="bloatMode" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ historyIndex: number, history: Shape[][] }>()
defineEmits<{
  undoHistory: []
  redoHistory: []
}>()
const bloatMode = defineModel('bloatMode')
const resolution = defineModel('resolution')
</script>