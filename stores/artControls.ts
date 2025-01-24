export const useArtControlsStore = defineStore('art-controls', () => {
  const shapeName = ref<ShapeName>('moon')
  const resolution = ref(5)
  const color = ref('#b0914d')
  const rotationCounter = ref(0)

  return { shapeName, resolution, color, rotationCounter }
})
