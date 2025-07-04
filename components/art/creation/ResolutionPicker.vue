<template>
    <fieldset class="border rounded border-zinc-500 flex gap-4 p-4">
      <legend class="text-center px-3">Resolution</legend>
      <Slider v-model="resolutionArray" :max="10" :min="4" :step="1" />
    </fieldset>
</template>

<script lang="ts" setup>
const { resolution } = storeToRefs(useArtControlsStore())
const resolutionArray = ref([resolution.value])
watchEffect(() => resolution.value = resolutionArray.value[0])
</script>