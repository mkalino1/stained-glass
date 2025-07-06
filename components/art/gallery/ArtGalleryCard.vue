<template>
  <div :id="String(id)">
    <div class="overflow-hidden relative before:bg-white/[0.04] before:h-full before:w-3/5
      before:top-0 before:skew-x-[-45deg] before:absolute before:left-[-150%] hover:before:left-[150%]
      hover:before:transition-[left] hover:before:duration-500 hover:before:ease-out">
      <svg class="bg-zinc-700" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${120 * resolution} ${120 * resolution}`">
        <g v-for="column in resolution" :key="column">
          <svg v-for="row in resolution" :key="row" :x="120 * (row - 1)" :y="120 * (column - 1)">
            <Shape v-for="shape in shapesMap.get(`${column}-${row}`)" :key="shape.id" :shape="shape"/>
          </svg>
        </g>
        <CamesOverlay :resolution="resolution" :shapes-map="shapesMap"/>
      </svg>
    </div>
    <div class="flex justify-between gap-4">
      <div class="text-xs flex gap-1 mt-1">
        <p>{{ totalLikes }}</p>
        <UTooltip :text="isLiked ? 'Unlike this art' : 'Like this art'">
          <Icon :name="isLiked ? 'tabler:heart-filled' : 'tabler:heart'" size="18" class="cursor-pointer" @click="toggleLike" />
        </UTooltip>
      </div>
      <div class="text-xs flex gap-1 mt-1">
        <p>{{ location }}</p>
        <p>|</p>
        <p>{{ timeAgo }}</p>
      </div>
      <UAvatar v-if="author" :src="`https://avatars.githubusercontent.com/u/${author}?s=64`" class="cursor-pointer" size="xs"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FetchError } from 'ofetch'

const { loggedIn } = useUserSession()
const { shapes, createdAt, id, likesCount, isLikedInitially } = defineProps<{
  id: number,
  resolution: number,
  shapes: string,
  createdAt: string,
  location: string | null,
  author: number | null,
  likesCount: number,
  isLikedInitially: boolean
}>()

const justToggledOffsetPersonal = ref(0)
const justToggledOffsetGlobal = ref(0)

const totalLikes = computed(() => likesCount + justToggledOffsetGlobal.value)

const isLiked = computed(() => {
  if (!loggedIn.value) return false
  return isLikedInitially == (justToggledOffsetPersonal.value == 0)
})

watch(loggedIn, (newValue) => {
  if(newValue) justToggledOffsetPersonal.value = 0
})

const parsedShapes: Shape[] = JSON.parse(shapes)

const shapesMap = new Map<string, Shape[]>()
parsedShapes.forEach((shape) => {
  const key = `${shape.column}-${shape.row}`
  if (shapesMap.has(key)) {
        shapesMap.get(key)?.push(shape)
      } else {
        shapesMap.set(key, [shape])
      }
})

const { $toast } = useNuxtApp()

async function toggleLike() {
  try {
    await $fetch(`/api/likes/${id}`, {
      method: isLiked.value ? 'DELETE' : 'POST'
    })
    justToggledOffsetGlobal.value += isLiked.value ? -1 : 1
    justToggledOffsetPersonal.value += isLiked.value ? -1 : 1
  } catch (error) {
    if (error instanceof FetchError) {
      $toast.error('Log in to like arts')
    }
  }
}

const timeAgo = useTimeAgo(new Date(createdAt))
</script>