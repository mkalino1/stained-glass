export const useArtControlsStore = defineStore('art-controls', () => {
  const shapeName = ref<ShapeName>('moon')
  const resolution = ref(5)
  const color = ref('#144837')
  const rotation = ref<Rotation>(Rotation.Angle0)

  function rotate(deltaY: number) {
    rotation.value = (rotation.value + 4 + (deltaY < 0 ? 1 : -1)) % 4
  }

  return { shapeName, resolution, color, rotation, rotate }
})
