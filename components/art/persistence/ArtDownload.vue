<template>
  <button class="px-3 py-1 rounded bg-zinc-700 flex items-center" @click="saveSvg">
    <Icon name="tabler:download" size="16" class="mr-1"/>
    Download
  </button>
</template>

<script lang="ts" setup>
const { $toast } = useNuxtApp()
function saveSvg() {
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