<template>
  <UAlert
    title="You can also download your art as svg before uploading!"
    variant="outline"
    class="bg-zinc-800 text-zinc-300 ring-zinc-700 px-4 md:px-6"
    :actions="[{
        onClick: downloadSvg,
        icon: 'tabler:download',
        variant: 'ghost',
        size: 'xl', 
        color: 'neutral',
        class: 'text-zinc-400'
      }]"
    orientation="horizontal" />  
</template>

<script lang="ts" setup>
const { $toast } = useNuxtApp()
const shapesStore = useShapesStore()

function downloadSvg() {
  if (!shapesStore.isCanvasFull) {
    $toast.error('Finish the art to download it')
    return
  }

  if (!shapesStore.shapes.some(shape => shape.color != shapesStore.shapes[0].color)) {
    $toast.error('Use at least two different colors')
    return
  }
  
  const svgElement = document.getElementById('canvas')
  if (!svgElement) {
    return
  }
  const svgData = svgElement.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = `glass-art-${new Date().getHours()}-${new Date().getMinutes()}`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  $toast.success('Art downloaded')
}
</script>