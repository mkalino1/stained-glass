<template>
  <div>
    <div class="flex gap-3 mb-4 justify-end mr-2 lg:mr-0">
      Sort by
      <UTooltip :text="sortByLikes ? 'Sorted by likes' : 'Sorted by date'">
        <Switch v-model="sortByLikes">
          <template #thumb>
            <Icon :name="sortByLikes ? 'tabler:heart-filled' : 'tabler:calendar'" size="14" class="bg-zinc-600"/>
          </template>
        </Switch>
      </UTooltip>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
      <ArtGalleryCard
        v-for="art in arts"
        :key="art.id"
        v-bind="art"
        :is-liked-initially="personalLikes?.some(el => el.artId == art.id) || false"
      />
    </div>
    <div ref="visibilityChecker" class="text-center mt-12">
      <div v-if="isAllLoaded">That's all!</div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { loggedIn } = useUserSession()
const sortByLikes = ref(false)
const { data: initialArts } = useFetch('/api/gallery', { query: { sortByLikes }})
const arts = ref(initialArts)
const { data: personalLikes, refresh: refreshPersonal } = useFetch('/api/likes/personal')

watch(loggedIn, (newValue) => {
  if (newValue) refreshPersonal()
})

const OFFSET = 12
const visibilityChecker = useTemplateRef<HTMLDivElement>('visibilityChecker')
const galleryBottomVisible = useElementVisibility(visibilityChecker)
const currentOffset = ref(OFFSET)
const isAllLoaded = ref(false)

watch(galleryBottomVisible, (newValue: boolean) => {
  if (newValue == true && !isAllLoaded.value) {
    loadMoreArts()
  }
})

watch(sortByLikes, () => {
  isAllLoaded.value = false
  currentOffset.value = OFFSET
})

async function loadMoreArts() {
  const load = await $fetch('/api/gallery', { query: { sortByLikes: sortByLikes.value, offset: currentOffset.value }})
  if (load.length < OFFSET) {
    isAllLoaded.value = true
  }
  arts.value = arts.value!.concat(load)
  currentOffset.value += OFFSET
}
</script>
