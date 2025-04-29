<template>
  <div class="rounded-md gap-2 flex flex-col">
    <ShapePicker />
    <ColorPicker />
    <ResolutionPicker />
    <div class="flex gap-5 justify-center">
      <div class="flex items-center gap-2">
        <button :disabled="cantUndo" :class="{ 'text-zinc-500': cantUndo, 'cursor-pointer': !cantUndo }" @click="undoHistory">Undo</button>
        <div class="pointer-coarse:hidden flex gap-0.5">
          <UKbd value="ctrl" variant='outline' size="sm" :class="['bg-zinc-800 text-zinc-400 ring-zinc-700', { 'text-zinc-500': cantUndo }]"/>
          <UKbd value="z" variant='outline' size="sm" :class="['bg-zinc-800 text-zinc-400 ring-zinc-700', { 'text-zinc-500': cantUndo }]"/>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button :disabled="cantRedo" :class="{ 'text-zinc-500': cantRedo, 'cursor-pointer': !cantRedo }" @click="redoHistory">Redo</button>
        <div class="pointer-coarse:hidden flex gap-0.5">
          <UKbd value="ctrl" variant='outline' size="sm" :class="['bg-zinc-800 text-zinc-400 ring-zinc-700', { 'text-zinc-500': cantRedo }]"/>
          <UKbd value="x" variant='outline' size="sm" :class="['bg-zinc-800 text-zinc-400 ring-zinc-700', { 'text-zinc-500': cantRedo }]"/>
        </div>
      </div>
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