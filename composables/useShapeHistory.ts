export const useShapeHistory = () => {
  const shapes = ref<Shape[]>([])
  const history = shallowReactive<Shape[][]>([[]])
  const historyIndex = ref(0)
  
  const cantUndo = computed(() => historyIndex.value <= 0)
  const cantRedo = computed(() => historyIndex.value >= history.length - 1)
  
  function pushHistory() {
    history.length = ++historyIndex.value
    history.push(clone(shapes.value))
  }

  function undoHistory() {
    shapes.value = clone(history[--historyIndex.value])
  }

  function redoHistory() {
    shapes.value = clone(history[++historyIndex.value])
  }

  function clone(shapes: Shape[]) {
    return shapes.map((s) => ({ ...s }))
  }

  function resetShapes() {  
    shapes.value = []
    history.length = 1
    historyIndex.value = 0
  }

  return {shapes, cantUndo: readonly(cantUndo), cantRedo: readonly(cantRedo), pushHistory, undoHistory, redoHistory, resetShapes}
}
