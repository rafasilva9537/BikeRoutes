export default interface BikeRouteDetails {
  id: number;
  title: string;
  description: string;
  image: string;
  averageSpeed: number | null;
  duration: number;
  distance: number;
  startPath: {
    x: number;
    y: number;
  };
  endPath: {
    x: number;
    y: number;
  };
  rating: number;
  userMainInfo: {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
  };
}