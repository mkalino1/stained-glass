<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
    <ArtGalleryCard v-for="art in arts" :key="art.id" v-bind="art" />
  </div>
</template>

<script lang="ts" setup>
const { data: arts } = useFetch('/api/gallery')
</script>