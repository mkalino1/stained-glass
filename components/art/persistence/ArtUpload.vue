<template>
  <button class="px-3 py-1 rounded bg-zinc-700 flex items-center" @click="uploadArt">
    <Icon name="tabler:cloud-upload" size="16" class="mr-1"/>
    Upload
  </button>
</template>

<script lang="ts" setup>
const controlsStore = useArtControlsStore()
const shapesStore = useShapesStore()
const { $toast } = useNuxtApp()

function uploadArt() {
  if (!shapesStore.isCanvasFull) {
    $toast.error('Finish the art to upload it')
    return
  }

  if (!shapesStore.shapes.some(shape => shape.color != shapesStore.shapes[0].color)) {
    $toast.error('Use at least two different colors')
    return
  }

  const artObj: Art = {
    resolution: controlsStore.resolution,
    shapes: shapesStore.shapes
  }

  $fetch('/api/gallery', {
    method: 'POST',
    body: artObj
  }).then(() => {
    $toast.success('Art uploaded', { description: 'Check it in the gallery' })
    shapesStore.resetShapes()
    navigateTo('/')
  }).catch((error) => {
    $toast.error(`Can't upload art`, { description: error.statusMessage })
  })
}
</script>