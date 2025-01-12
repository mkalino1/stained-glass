function buildShape(column: number, row: number, bloatMode = false, rotationCounter = 0, shadow = false,): Shape {
  return ({
    column: column,
    row: row,
    angle: 90 * (rotationCounter % 4),
    path: buildPath(bloatMode),
    opacity: shadow ? 0.3 : 0.8,
    isShadow: shadow
  })
}

function buildPath(bloat: boolean) {
  return `
      M 0,0
      a 100 100 0 0 ${bloat ? 1 : 0} 100 100
      h -100 Z`
  // d = "M 25 1.5 a 23.5 23.5 0 0 0 -23.5 23.5 h 23.5 Z"
}

export { buildShape, buildPath }
