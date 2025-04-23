<template>
  <div class="flex flex-col md:flex-row gap-8 justify-center" @wheel="handleWheel">
    <div class="flex flex-col grow">
      <ArtCreatorHints />
      <ArtCanvas />
    </div>
    <div class="flex flex-col md:mt-12">
      <ArtControls />
      <div class="flex justify-evenly mt-5">
        <ArtDownload />
        <ArtUpload />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const artControlsStore = useArtControlsStore()
function handleWheel(event: WheelEvent) {
  artControlsStore.rotate(event.deltaY)
}
</script>
