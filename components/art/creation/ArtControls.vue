<template>
  <div>
    <div class="flex gap-4 justify-center bg-slate-600 p-4 mb-2">
      <button @click="$emit('undoHistory')" :disabled="canUndo" class="mr-2">Undo</button>
      <button @click="$emit('redoHistory')" :disabled="canRedo">Redo</button>
      <ColorPicker/>
      <ResolutionPicker />
    </div>
    <ShapePicker/>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ canUndo: boolean, canRedo: boolean }>()
defineEmits<{ undoHistory: [], redoHistory: [] }>()
</script>