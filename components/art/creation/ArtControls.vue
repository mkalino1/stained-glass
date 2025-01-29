<template>
  <div class="rounded-md bg-gray-600 p-6 gap-6 flex flex-col">
    <div class="flex gap-5 justify-center">
      <button :disabled="shapesStore.canUndo" @click="shapesStore.undoHistory">Undo</button>
      <button :disabled="shapesStore.canRedo" @click="shapesStore.redoHistory">Redo</button>
      <ResolutionPicker />
    </div>
    <ColorPicker/>
    <ShapePicker/>
  </div>
</template>

<script lang="ts" setup>
const shapesStore = useShapesStore()
</script>