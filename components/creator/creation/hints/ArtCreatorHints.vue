<template>
  <div class="flex justify-evenly p-4 text-zinc-600">
    <div class="flex pointer-coarse:hidden"><Icon name="tabler:mouse" size="24" class="mr-2" />Use scroll or arrows to rotate</div>
    <div class="flex pointer-coarse:hidden"><Icon name="tabler:mouse-2" size="24" class="mr-2" />Right click to edit shape</div>
    <div class="flex pointer-fine:hidden"><Icon name="tabler:hand-finger" size="24" class="mr-2" />Long press to edit shape</div>
  </div>
</template>

<script setup lang="ts">
const {arrowleft, arrowright } = useMagicKeys()
const artControlsStore = useArtControlsStore()

whenever(arrowleft, () => artControlsStore.rotate(1))
whenever(arrowright, () => artControlsStore.rotate(-1))
</script>