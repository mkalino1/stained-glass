type Shape = {
    id: number;
    column: number;
    row: number;
    angle: number;
    path: string;
    opacity: number;
    isShadow: boolean;
    color: string;
    collisionPoints: Set<CollisionPoint>;
};