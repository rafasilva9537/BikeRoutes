export default interface BikeRoute {
    id: number,
    userId: number
    title: string,
    image: string,
    description: string,
    duration: number, // minutes
    distance: number, // km
    rating: number, // 0 to 5
    average_speed: number // km/h
}