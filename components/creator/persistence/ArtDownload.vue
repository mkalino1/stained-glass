<template>
  <div class="space-y-4">
    <UAlert
      description="You can download your artwork as SVG or PNG before uploading" 
      variant="soft"
      class="text-zinc-300 px-4 md:px-6" 
    />
    <div class="flex gap-6 justify-center">
      <UTooltip text="Download your artwork as a SVG file">
        <UButton
          label="Save as SVG"
          icon="tabler:download"
          @click="downloadSvg"
        />
      </UTooltip>
      <UTooltip text="Download your artwork as a PNG file">
        <UButton
          label="Save as PNG"
          icon="tabler:download"
          @click="downloadPng"
        />
      </UTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
const PNG_WIDTH = 1000
const PNG_HEIGHT = 1000

const { $toast } = useNuxtApp()
const shapesStore = useShapesStore()

function downloadSvg() {
  if (!isArtworkValid()) return
  const svgUrl = getSvgUrlData()
  try {
    downloadUsingOffscreenLink(svgUrl)
  } finally {
    URL.revokeObjectURL(svgUrl)
  }
}

async function downloadPng() {
  if (!isArtworkValid()) return
  const svgUrl = getSvgUrlData()

  try {
    const img = new Image();
    img.src = svgUrl

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement("canvas")
    canvas.width = PNG_WIDTH
    canvas.height = PNG_HEIGHT

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error('Could not get canvas context')
    }
    
    ctx.drawImage(img, 0, 0, PNG_WIDTH, PNG_HEIGHT)
    const pngUrl = canvas.toDataURL("image/png")
    downloadUsingOffscreenLink(pngUrl)
  } catch (error) {
    console.error('Error converting SVG to PNG:', error)
    $toast.error('Failed to download PNG')
  } finally {
    URL.revokeObjectURL(svgUrl)
  }
}

function isArtworkValid(): boolean {
  if (!shapesStore.isCanvasFull) {
    $toast.error('Finish the art to download it')
    return false
  }
  if (!shapesStore.shapes.some(shape => shape.color != shapesStore.shapes[0].color)) {
    $toast.error('Use at least two different colors')
    return false
  }
  return true
}

function getSvgUrlData(): string {
  const svgElement = document.getElementById('canvas')
  if (!svgElement) {
    throw new Error('Could not get art canvas')
  }

  const clonedSvg = svgElement.cloneNode(true) as SVGElement
  
  clonedSvg.setAttribute('width', '1000')
  clonedSvg.setAttribute('height', '1000')

  const svgData = clonedSvg.outerHTML
  const preface = '<?xml version="1.0" standalone="no"?>\r\n'
  const svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" })
  const svgUrl = URL.createObjectURL(svgBlob)

  return svgUrl
}

function downloadUsingOffscreenLink(url: string) {
  const downloadLink = document.createElement("a")
  downloadLink.href = url
  downloadLink.download = `stained-glass-art-${new Date().toISOString().slice(0, 10).split('-').reverse().join('-')}`

  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)

  $toast.success('Art downloaded')
}
</script>