<template>
  <div class="flex flex-col md:flex-row gap-8 justify-center md:px-8" @wheel="handleWheel">
    <div class="flex flex-col grow">
      <ArtCreatorHints />
      <ArtCanvas />
      <UndoRedoHints />
    </div>
    <div class="flex flex-col md:mt-12">
      <ArtControls />
      <div class="flex justify-evenly mt-4">
        <PersistenceModal />
        <UButton variant="soft" label="Reset" class="cursor-pointer" @click="resetShapes"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const artControlsStore = useArtControlsStore()
const { resetShapes } = useShapesStore()
function handleWheel(event: WheelEvent) {
  artControlsStore.rotate(event.deltaY)
}
</script>
