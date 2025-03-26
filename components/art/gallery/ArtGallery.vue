<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
    <ArtGalleryCard
      v-for="art in arts"
      :key="art.id"
      v-bind="art"
      :is-liked="isLiked(art.id)"
      @refresh="refresh"
    />
  </div>
</template>

<script lang="ts" setup>
const { data: arts } = useFetch('/api/gallery')
const { data: likes, refresh } = useFetch('/api/likes')

function isLiked(artId: number): boolean {
  return likes.value?.some(art => art.artId == artId) || false
}
</script>
