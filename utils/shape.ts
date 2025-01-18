function buildShape(shapeName: string, column: number, row: number, color: string, rotationCounter = 0): Shape {
  return buildShapeInternal(shapeName, column, row, color, rotationCounter)
}

function buildShadowShape(shapeName: string, column: number, row: number, color: string, rotationCounter = 0): Shape {
  return buildShapeInternal(shapeName, column, row, color, rotationCounter, true)
}

function buildDisplayShape(shapeName: string): Shape {
  return buildShapeInternal(shapeName, 0, 0, '#336633')
}

function buildShapeInternal(shapeName: string, column: number, row: number, color: string, rotationCounter = 0, shadow = false): Shape {
  return ({
    column: column,
    row: row,
    angle: 90 * (rotationCounter % 4),
    path: buildPath(shapeName),
    opacity: shadow ? 0.3 : 0.8,
    isShadow: shadow,
    color: color
  })
}

function buildPath(shapeName: string) {
  switch (shapeName) {
    case 'moon':
      return `
        M 0,0
        a 100 100 0 0 0 100 100
        h -100 Z`
    case 'arc':
      return `
        M 0,0
        a 100 100 0 0 1 100 100
        h -100 Z`
  }
  return ''
  // d = "M 25 1.5 a 23.5 23.5 0 0 0 -23.5 23.5 h 23.5 Z"
}

export { buildShape, buildShadowShape, buildDisplayShape }
