<template>
  <div>
    <svg id="canvas" class="bg-zinc-700" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${60 * resolution} ${60 * resolution}`">
      <template v-for="column in resolution" :key="column">
        <svg v-for="row in resolution" :key="row" :x="60 * (row - 1)" :y="60 * (column - 1)">
          <Shape v-for="shape in shapesOnTile(column, row)" :key="shape.id" :shape="shape" />
        </svg>
      </template>
    </svg>
    <div class="flex justify-between">
      <p>{{ timeAgo }}</p>
      <p>{{ location }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatTimeAgo } from '@vueuse/core';

const { shapes, createdAt } = defineProps<{
  id: number,
  resolution: number,
  shapes: string,
  createdAt: string,
  location: string | null
}>()

const parsedShapes: Shape[] = JSON.parse(shapes)

const timeAgo = formatTimeAgo(new Date(createdAt))

function shapesOnTile(column: number, row: number) {
  return parsedShapes.filter((el) => el.column === column && el.row == row)
}
</script>