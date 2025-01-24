<template>
  <div class="flex flex-col items-center gap-8 mt-6" @wheel="handleWheel">
    <div class="flex items-center">
      <ArtControls />
      <ArtDownload />
    </div>
    <ArtCanvas />
  </div>
</template>

<script lang="ts" setup>
const artControlsStore = useArtControlsStore()
function handleWheel(event: WheelEvent) {
  artControlsStore.rotationCounter += event.deltaY < 0 ? 1 : -1
}
</script>
