<template>
  <input v-model.number="resolution" type="number" class="w-8 px-1 text-center" >
</template>

<script lang="ts" setup>
const { resolution } = storeToRefs(useArtControlsStore())
</script>