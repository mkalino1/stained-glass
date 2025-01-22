<template>
  <div>
    <div class="flex gap-4 justify-center bg-slate-600 p-4 mb-2">
      <button @click="$emit('undoHistory')" :disabled="canUndo" class="mr-2">Undo</button>
      <button @click="$emit('redoHistory')" :disabled="canRedo">Redo</button>
      <ColorPicker v-model="color" />
      <input v-model.number="resolution" type="number" class="w-8 px-1 text-center" />
    </div>
    <ShapePicker v-model="shapeName" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ canUndo: boolean, canRedo: boolean }>()
defineEmits<{ undoHistory: [], redoHistory: [] }>()
const shapeName = defineModel('shapeName')
const resolution = defineModel('resolution')
const color = defineModel('color')
</script>