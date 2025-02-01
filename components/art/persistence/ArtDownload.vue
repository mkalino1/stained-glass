<template>
  <button class="px-4 py-1 mt-5 rounded bg-zinc-700 mx-auto" @click="saveSvg">Download</button>
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