<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
    <ArtGalleryCard
      v-for="art in arts"
      :key="art.id"
      v-bind="art"
      :is-liked="isLiked(art.id)"
      @refresh="refresh"
      :likes-number="getTotalLikes(art.id)"
    />
  </div>
</template>

<script lang="ts" setup>
const { data: arts } = useFetch('/api/gallery')
const { data: likes, refresh } = useFetch('/api/likes')

function getTotalLikes(artId: number): number {  
  return likes.value?.total.find(art => art.artId == artId)?.total || 0
}

function isLiked(artId: number): boolean {
  return likes.value?.personal.some(art => art.artId == artId) || false
}
</script>
