<template>
  <div>
    <div class="flex gap-3 mb-4 justify-end mr-2 lg:mr-0">
      Sort by
      <Switch v-model="sortByLikes">
        <template #thumb>
          <Icon :name="sortByLikes ? 'tabler:heart-filled' : 'tabler:calendar'" size="14" class="bg-zinc-600"/>
        </template>
      </Switch>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
      <ArtGalleryCard
        v-for="art in arts"
        :key="art.id"
        v-bind="art"
        :is-liked="isLiked(art.id)"
        @refresh="refreshTotal();refreshPersonal()"
        :likes-number="getTotalLikes(art.id, art.likesCount)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const sortByLikes = ref(false)

const { data: arts } = useFetch('/api/gallery', { query: { sortByLikes }})
const { data: totalLikes, refresh: refreshTotal, status: statusTotal } = useFetch('/api/likes/total', {
  immediate: false
})
const { data: personalLikes, refresh: refreshPersonal } = useFetch('/api/likes/personal')

function getTotalLikes(artId: number, initialLikes: number): number {
  if (statusTotal.value == 'success') {
    return totalLikes.value?.find(art => art.artId == artId)?.total || 0
  }
  return initialLikes || 0
}

function isLiked(artId: number): boolean {
  return personalLikes.value?.some(art => art.artId == artId) || false
}
</script>
