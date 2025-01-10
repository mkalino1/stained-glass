<script setup lang="ts">
type Shape = {
  x: number;
  y: number;
  angle: number;
  path: string;
  opacity: number;
};

const shapes = ref<Shape[]>([])
const shadowShape = ref<Shape | null>()
const shapesToRender = computed(() => shadowShape.value ? [...shapes.value, shadowShape.value] : shapes.value)
const bloatMode = ref(true)

function addShape({ target }: Event) {
  shapes.value.push(buildShape(target as HTMLElement))
  pushHistory()
}
function buildShape(target: HTMLElement, shadow = false): Shape {
  const targetX = Number(target.getAttribute("x"))
  const targetY = Number(target.getAttribute("y"))
  return ({
    x: targetX,
    y: targetY,
    angle: 90 * (rotateCounter.value % 4),
    path: buildPath(targetX, targetY, bloatMode.value),
    opacity: shadow ? 0.3 : 0.8,
    isShadow: shadow
  })
}
function buildPath(x: number, y: number, bloat: boolean) {
  return `
      M ${x},${y}
      a 100 100 0 0 ${bloat ? 1 : 0} 100 100
      h -100 Z`
  // d = "M 25 1.5 a 23.5 23.5 0 0 0 -23.5 23.5 h 23.5 Z"
}

const index = ref(0)
const history = shallowReactive<Shape[][]>([[]])
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
function clone(shapes: Shape[]) {
  return shapes.map((s) => ({ ...s }))
}

const rotateCounter = ref(0)
// TODO: abstract rotating logic to the parent
function handleWheel(event: WheelEvent) {
  rotateCounter.value += event.deltaY < 0 ? 1 : -1
}

watch(rotateCounter, () => {
  if (shadowShape.value) {
    shadowShape.value.angle = 90 * (rotateCounter.value % 4)
  }
})

function onMouseover({ target }: Event) {
  shadowShape.value = buildShape(target as HTMLElement, true)
}
</script>

<template>
  <svg class="w-[650px] h-[650px] bg-gray-800" @wheel="handleWheel">
    <template v-for="j in 4">
      <rect v-for="i in 4" @click="addShape" @mouseover="onMouseover" class="fixed" width="100" height="100"
        :x="110 * i" :y="110 * j" :fill="'#666'" />
    </template>
    <path v-for="el in shapesToRender" fill="#229922" stroke="#123712" stroke-width="5" :d="el.path"
      @contextmenu.prevent="console.log('preventing')" :style="{
        'transform-origin': `${el.x + 50}px ${el.y + 50}px`,
        'transform': `rotate(${el.angle}deg)`, opacity: el.opacity,
        'pointer-events': el.isShadow ? 'none' : 'auto'
      }" />
  </svg>
  <div class="fixed top-3 left-0 right-0 text-center">
    {{ rotateCounter }}
    <input type="checkbox" v-model="bloatMode" />
    <button @click="undoHistory" :disabled="index <= 0" class="mr-2">Undo</button>
    <button @click="redoHistory" :disabled="index >= history.length - 1">Redo</button>
  </div>
</template>