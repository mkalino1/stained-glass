<template>
  <div class="flex items-center">
    <svg ref="canvas" :width="110 * resolution + 220" :height="110 * resolution + 220" class="bg-gray-800"
      xmlns="http://www.w3.org/2000/svg">
      <template v-for="column in resolution">
        <svg v-for="row in resolution" @mouseover="setShadowShape(column, row)" @mouseleave="resetShadowShape()"
          :x="110 * row" :y="110 * column">
          <rect @click="$emit('addShape', column, row)" class="fixed" width="100" height="100" :fill="'#66666620'" />
          <Shape v-for="shape in shapesOnTile(column, row)" :shape="shape" />
        </svg>
      </template>
    </svg>
    <button @click="saveSvg" class="h-8 px-3 py-1 ml-2 border rounded bg-slate-500 mx-auto">Download</button>
  </div>
</template>

<script setup lang="ts">
const { shapes, rotationCounter, shapeName, color } = defineProps<{
  shapes: Shape[],
  resolution: number,
  rotationCounter: number,
  shapeName: ShapeName,
  color: string
}>()
defineEmits<{
  addShape: [column: number, row: number]
}>()

const shadowShape = ref<Shape | null>()
const shapesToRender = computed(() => shadowShape.value ? [...shapes, shadowShape.value] : shapes)
function setShadowShape(column: number, row: number) {
  shadowShape.value = buildShadowShape(shapeName, column, row, color, rotationCounter)
}
function resetShadowShape() {
  shadowShape.value = null
}
watch(() => rotationCounter, () => {
  if (shadowShape.value) {
    shadowShape.value.angle = 90 * (rotationCounter % 4)
  }
})

function shapesOnTile(column: number, row: number) {
  return shapesToRender.value.filter((el) => el.column === column && el.row == row)
}

const svgElement = useTemplateRef('canvas')
function saveSvg() {
  if (!svgElement.value) {
    return
  }
  const svgData = svgElement.value.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = `glass-art-${new Date().getHours()}-${new Date().getMinutes()}`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
</script>