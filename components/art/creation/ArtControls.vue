<template>
  <div class="rounded-md gap-2 flex flex-col">
    <ColorPicker />
    <ShapePicker />
    <ResolutionPicker />
    <div class="flex gap-5 justify-center">
      <button :disabled="cantUndo" :class="{ 'text-zinc-500': cantUndo }" @click="undoHistory">Undo</button>
      <button :disabled="cantRedo" :class="{ 'text-zinc-500': cantRedo }" @click="redoHistory">Redo</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { undoHistory, redoHistory } = useShapesStore()
const { cantUndo, cantRedo } = storeToRefs(useShapesStore())
const { $toast } = useNuxtApp()
const { ctrl_z, ctrl_shift_z, ctrl_x, shift } = useMagicKeys()

whenever(() => ctrl_z.value && !shift.value, () => {
  if (!cantUndo.value) {
    undoHistory()
  } else {
    $toast.error('Cannot undo')
  }
})

whenever(() => ctrl_x.value || ctrl_shift_z.value, () => {
  if (!cantRedo.value) {
    redoHistory()
  } else {
    $toast.error('Cannot redo')
  }
})
</script>