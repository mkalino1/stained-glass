<script setup>
const shapes = ref([])
const bloatMode = ref(true)
function addShape({ target }) {
  shapes.value.push({
    x: target.getBoundingClientRect().x,
    y: target.getBoundingClientRect().y,
    angle: 90 * (rotateCounter.value % 4),
    path: createPath(target.getBoundingClientRect().x, target.getBoundingClientRect().y, bloatMode.value)
  })
  pushHistory()
}
function createPath(x, y, bloat) {
  return `
      M ${x},${y}
      a 100 100 0 0 ${bloat ? 1 : 0} 100 100
      h -100 Z`
  // d = "M 25 1.5 a 23.5 23.5 0 0 0 -23.5 23.5 h 23.5 Z"
}

const index = ref(0)
const history = shallowReactive([[]])
function pushHistory() {
  history.length = ++index.value
  history.push(clone(shapes.value))
}
function undoHistory() {
  shapes.value = clone(history[--index.value])
}
function redoHistory() {
  shapes.value = clone(history[++index.value])
}
function clone(shapes) {
  return shapes.map((s) => ({ ...s }))
}

const rotateCounter = ref(0)
// TODO: abstract rotating logic to the parent
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
      :d="el.path" @contextmenu.prevent="console.log('preventing')"
      :style="{'transform-origin': `${el.x+50}px ${el.y+50}px`, transform: `rotate(${el.angle}deg)`}"/>
  </svg>
  <div class="fixed top-3 left-0 right-0 text-center">
    {{ rotateCounter }}
    <input type="checkbox" v-model="bloatMode"/> 
    <button @click="undoHistory" :disabled="index <= 0" class="mr-2">Undo</button>
    <button @click="redoHistory" :disabled="index >= history.length - 1">Redo</button>
  </div>
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
}
</style>