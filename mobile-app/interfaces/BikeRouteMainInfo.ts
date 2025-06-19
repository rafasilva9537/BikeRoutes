export default interface BikeRouteMainInfo {
  id: number;
  title: string;
  image: string;
  duration: number;
  distance: number;
  rating: number;
  userMainInfo: {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
  };
}