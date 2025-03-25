<template>
  <div>
    <svg id="canvas" class="bg-zinc-700" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${60 * resolution} ${60 * resolution}`">
      <template v-for="column in resolution" :key="column">
        <svg v-for="row in resolution" :key="row" :x="60 * (row - 1)" :y="60 * (column - 1)">
          <Shape v-for="shape in shapesMap.get(`${column}-${row}`)" :key="shape.id" :shape="shape" />
        </svg>
      </template>
    </svg>
    <div class="flex justify-between">
      <Icon :name="isLiked ? 'tabler:heart-filled' : 'tabler:heart'" size="24" class="cursor-pointer" @click="addLike" />
      <p>{{ timeAgo }}</p>
      <p>{{ location }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { shapes, createdAt, id } = defineProps<{
  id: number,
  resolution: number,
  shapes: string,
  createdAt: string,
  location: string | null,
  isLiked: boolean
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

async function addLike() {
  await $fetch('/api/likes', {
    method: 'POST',
    body: { artId: id }
  })
}

const timeAgo = useTimeAgo(new Date(createdAt))
</script>