<template>
  <div class="flex gap-2">
    <div v-for="color in defaultColors" @click="changeColor(color)" :style="{ backgroundColor: color }"
      class="w-8 h-8 rounded-md border border-slate-400"></div>
    <input type="color" v-model="colorModel" class="w-8 h-8 rounded-md border border-slate-400" />
  </div>
</template>

<script lang="ts" setup>
const colorModel = defineModel()

const defaultColors = ["#711415", "#ae311e", "#f37324", "#f6a020", "#f8cc1b", "#b5be2f", "#72b043", "#007f4e"]

function changeColor(newColor: string) {
  colorModel.value = newColor
}
</script>