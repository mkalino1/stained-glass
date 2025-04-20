<template>
  <div :id="String(id)">
    <svg class="bg-zinc-700" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${60 * resolution} ${60 * resolution}`">
      <template v-for="column in resolution" :key="column">
        <svg v-for="row in resolution" :key="row" :x="60 * (row - 1)" :y="60 * (column - 1)">
          <Shape v-for="shape in shapesMap.get(`${column}-${row}`)" :key="shape.id" :shape="shape" />
        </svg>
      </template>
    </svg>
    <div class="flex justify-between gap-4">
      <div class="text-sm flex gap-1">
        <p>{{ likesNumber }}</p>
        <Icon :name="isLiked ? 'tabler:heart-filled' : 'tabler:heart'" size="20" class="cursor-pointer" @click="addLike" />
      </div>
      <div class="text-sm flex gap-1">
        <p>{{ location }}</p>
        <p>|</p>
        <p>{{ timeAgo }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FetchError } from 'ofetch'

const { shapes, createdAt, id, isLiked } = defineProps<{
  id: number,
  resolution: number,
  shapes: string,
  createdAt: string,
  location: string | null,
  isLiked: boolean,
  likesNumber: number
}>()

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
const emit = defineEmits(['refresh'])

async function addLike() {
  try {
    await $fetch('/api/likes', {
      method: isLiked ? 'DELETE' : 'POST',
      body: { artId: id }
    })
    emit('refresh')
  } catch (error) {
    if (error instanceof FetchError) {
      $toast.error('Log in to like arts')
    }
  }
}

const timeAgo = useTimeAgo(new Date(createdAt))
</script>