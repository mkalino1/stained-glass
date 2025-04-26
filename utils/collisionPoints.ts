function getCollisionPoints(shapeName: ShapeName, rotation: Rotation): Set<CollisionPoint> {
  switch (shapeName) {
    case 'moon':
      return new Set([(CollisionPoint.BottomLeft + rotation) % 4])
    case 'arc':
      return new Set([
        (CollisionPoint.BottomLeft + rotation) % 4,
        (CollisionPoint.BottomRight + rotation) % 4,
        (CollisionPoint.TopLeft + rotation) % 4,
        CollisionPoint.Center
      ])
    case 'marquise':
      return new Set([
        (CollisionPoint.TopLeft + rotation) % 4,
        (CollisionPoint.BottomRight + rotation) % 4,
        CollisionPoint.Center
      ])
  } 
}

export { getCollisionPoints }