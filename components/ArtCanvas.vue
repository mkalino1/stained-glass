<script setup lang="ts">
type Shape = {
  column: number;
  row: number;
  angle: number;
  path: string;
  opacity: number;
  isShadow: boolean;
};

const shapes = ref<Shape[]>([])
const shadowShape = ref<Shape | null>()
const shapesToRender = computed(() => shadowShape.value ? [...shapes.value, shadowShape.value] : shapes.value)
const bloatMode = ref(true)
const resolution = ref(5)

function addShape(column: number, row: number) {
  shapes.value.push(buildShape(column, row))
  pushHistory()
}
function buildShape(column: number, row: number, shadow = false): Shape {
  return ({
    column: column,
    row: row,
    angle: 90 * (rotateCounter.value % 4),
    path: buildPath(bloatMode.value),
    opacity: shadow ? 0.3 : 0.8,
    isShadow: shadow
  })
}
function buildPath(bloat: boolean) {
  return `
      M 0,0
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

function buildShadowShape(column: number, row: number) {
  shadowShape.value = buildShape(column, row, true)
}

function shapesOnTile(column: number, row: number) {
  return shapesToRender.value.filter((el) => el.column === column && el.row == row)
}
</script>

<template>
  <svg class="bg-gray-800" @wheel="handleWheel" :width="110 * resolution + 220" :height="110 * resolution + 220">
    <template v-for="column in resolution">
      <svg v-for="row in resolution" @mouseover="buildShadowShape(column, row)" :x="110 * row" :y="110 * column">
        <rect @click="addShape(column, row)" class="fixed" width="100" height="100" :fill="'#66666620'" />
        <path v-for="el in shapesOnTile(column, row)" fill="#229922" stroke="#123712" stroke-width="5" :d="el.path"
          @contextmenu.prevent="console.log('preventing')" :style="{
            'transform-origin': '50px 50px',
            'transform': `rotate(${el.angle}deg)`,
            'opacity': el.opacity,
            'pointer-events': el.isShadow ? 'none' : 'auto'
          }" />
      </svg>
    </template>
  </svg>
  <div class="fixed top-20 left-0 right-0 text-center flex gap-4 justify-center">
    {{ rotateCounter }}
    <input type="checkbox" v-model="bloatMode" />
    <button @click="undoHistory" :disabled="index <= 0" class="mr-2">Undo</button>
    <button @click="redoHistory" :disabled="index >= history.length - 1">Redo</button>
    <input v-model.number="resolution" />
  </div>
</template>