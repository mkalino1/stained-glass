<template>
  <input v-model.number="resolution" type="number" class="w-8 px-1 text-center rounded-md" >
</template>

<script lang="ts" setup>
const { resolution } = storeToRefs(useArtControlsStore())
</script>