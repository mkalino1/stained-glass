<template>
  <div v-if="shapesStore.shapeToDeleteId !== -1" class="fixed top-1/4 left-1/4 bg-slate-100 px-12 py-4 rounded-lg text-center" @click.stop>
    <p>Are you sure you want to delete this shape?</p>
    <button class="bg-slate-300 px-8 py-1 mt-3 rounded-lg" @click="deleteShape">Delete</button>
    <button class="absolute top-2 right-4" @click="closeDialog">X</button>
  </div>
</template>

<script lang="ts" setup>
const shapesStore = useShapesStore()
function deleteShape() {
  shapesStore.deleteShape()
}
function closeDialog() {
  shapesStore.shapeToDeleteId = -1
}
</script>