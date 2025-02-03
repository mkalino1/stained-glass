<template>
  <button class="px-4 py-1 mt-5 rounded bg-zinc-700 mx-auto" @click="uploadArt">Upload</button>
</template>

<script lang="ts" setup>
const controlsStore = useArtControlsStore()
const shapesStore = useShapesStore()
const { $toast } = useNuxtApp()

function uploadArt() {
  const artObj: Art = {
    resolution: controlsStore.resolution,
    shapes: shapesStore.shapes
  }

  $fetch('/api/upload', {
    method: 'POST',
    body: artObj
  }).catch((error) => {
    $toast.error('Cannot upload art', { description: error.statusMessage })
  })
}
</script>