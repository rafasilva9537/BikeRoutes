export interface CreateBikeRoute {
    title: string;
    description: string;
    image: string;
    startPath: { x: number; y: number };
    endPath: { x: number; y: number };
    duration: number;
}