<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
    <ArtGalleryCard
      v-for="art in arts"
      :key="art.id"
      v-bind="art"
      :is-liked="isLiked(art.id)"
      @refresh="refreshTotal();refreshPersonal()"
      :likes-number="getTotalLikes(art.id)"
    />
  </div>
</template>

<script lang="ts" setup>
const { data: arts } = useFetch('/api/gallery')
const { data: totalLikes, refresh: refreshTotal } = useFetch('/api/likes/total')
const { data: personalLikes, refresh: refreshPersonal } = useFetch('/api/likes/personal')

function getTotalLikes(artId: number): number {
  return totalLikes.value?.find(art => art.artId == artId)?.total || 0
}

function isLiked(artId: number): boolean {
  return personalLikes.value?.some(art => art.artId == artId) || false
}
</script>
