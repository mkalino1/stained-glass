<template>
  <div class="rounded-md gap-2 flex flex-col">
    <ResolutionPicker />
    <ColorPicker/>
    <ShapePicker/>
    <div class="flex gap-5 justify-center">
      <button :disabled="shapesStore.canUndo" @click="shapesStore.undoHistory">Undo</button>
      <button :disabled="shapesStore.canRedo" @click="shapesStore.redoHistory">Redo</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const shapesStore = useShapesStore()
</script>