<template>
  <div class="flex flex-col md:flex-row gap-8 justify-center mt-8" @wheel="handleWheel">
    <ArtCanvas />
    <div class="flex flex-col">
      <ArtControls />
      <ArtDownload />
    </div>
    <DeleteShapeDialog />
  </div>
</template>

<script lang="ts" setup>
const artControlsStore = useArtControlsStore()
function handleWheel(event: WheelEvent) {
  artControlsStore.rotate(event.deltaY)
}
</script>
