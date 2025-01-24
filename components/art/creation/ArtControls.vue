<template>
  <div>
    <div class="flex gap-4 justify-center bg-slate-600 p-4 mb-2">
      <button :disabled="shapesStore.canUndo" class="mr-2" @click="shapesStore.undoHistory">Undo</button>
      <button :disabled="shapesStore.canRedo" @click="shapesStore.redoHistory">Redo</button>
      <ColorPicker/>
      <ResolutionPicker />
    </div>
    <ShapePicker/>
  </div>
</template>

<script lang="ts" setup>
const shapesStore = useShapesStore()
</script>