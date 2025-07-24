<template>
  <UContextMenu :items="items" :disabled="shapesStore.chosenShapeId == -1" >
    <slot />
  </UContextMenu>
</template>

<script setup lang="ts">
import type { ContextMenuItem } from '@nuxt/ui'

const items: ContextMenuItem[][] = [
  [
    {
      label: 'Copy shape color',
      icon: 'lucide:pipette',
      onSelect() {
        copyColor()
      }
    },
    {
      label: 'Apply selected color',
      icon: 'lucide:paint-bucket',
      onSelect() {
        setColor()
      }
    }
  ],
  [
    {
      label: 'Delete shape',
      color: 'error' as const,
      icon: 'lucide:trash-2',
      onSelect(){
        deleteShape()
      }
    }
  ]
]

const { $toast } = useNuxtApp()
const shapesStore = useShapesStore()
const { color } = storeToRefs(useArtControlsStore())

function setColor() {
  if (shapesStore.chosenShapeId == -1) return

  const found = shapesStore.shapes.find(shape => shape.id == shapesStore.chosenShapeId)
  if (found != undefined) {
    found.color = color.value
    shapesStore.pushHistory()
    shapesStore.chosenShapeId = -1
  }
}

function copyColor() {
  if (shapesStore.chosenShapeId == -1) return

  const found = shapesStore.shapes.find(shape => shape.id == shapesStore.chosenShapeId)
  if (found != undefined) {
    color.value = found.color
    shapesStore.chosenShapeId = -1
  }
}

function deleteShape() {
  if (shapesStore.chosenShapeId == -1) return

  shapesStore.deleteShape()
  $toast.success('Shape deleted', {
    action: {
      label: 'Undo',
      onClick: () => shapesStore.cantUndo || shapesStore.undoHistory()
    }
  })
}
</script>