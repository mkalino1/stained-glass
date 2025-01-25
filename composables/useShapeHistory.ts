export const useShapeHistory = () => {
  const shapes = ref<Shape[]>([])
  const history = shallowReactive<Shape[][]>([[]])
  const historyIndex = ref(0)
  
  const canUndo = computed(() => historyIndex.value <= 0)
  const canRedo = computed(() => historyIndex.value >= history.length - 1)
  
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

  return {shapes, canUndo, canRedo, pushHistory, undoHistory, redoHistory}
}
