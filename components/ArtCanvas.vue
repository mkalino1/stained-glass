<script setup>
const shapes = ref([])
function addShape({ target }) {
  shapes.value.push({
    x: target.getBoundingClientRect().x,
    y: target.getBoundingClientRect().y,
    bold: Math.random() > 0.92,
  })
}
function createPath(x, y, bold) {
  return `
      M ${x},${y}
      a 100 100 0 0 ${bold ? 1 : 0} 100 100
      h -100 Z`
  // d = "M 25 1.5 a 23.5 23.5 0 0 0 -23.5 23.5 h 23.5 Z"
}

const rotateCounter = ref(0)
function handleWheel(event) {
  if (event.wheelDeltaY > 0) {
    rotateCounter.value += 1
  } else {
    rotateCounter.value -= 1
  }
}
</script>

<template>
  <svg class="fixed w-screen h-screen bg-gray-800" @wheel="handleWheel">
    <template v-for="j in 4">
      <rect @click="addShape" v-for="i in 4" class="fixed" width="100" height="100" :x="110 * i" :y="110 * j" :fill="'#666'" />
    </template>
    <path v-for="el in shapes" ref="tmp" fill="#229922" stroke="#123712" stroke-width="5"
      :d="createPath(el.x, el.y, el.bold)" @contextmenu.prevent="console.log('preventing')"/>
  </svg>
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
}
</style>