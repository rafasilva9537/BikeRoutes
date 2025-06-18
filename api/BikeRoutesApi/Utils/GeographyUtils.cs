using NetTopologySuite.Geometries;

namespace BikeRoutesApi.Utils;

public static class GeographyUtils
{
    public static double CalculateHaversineDistance(Point point, Point point2)
    {
        const double R = 6371 * 1000; // Mean earth radius in meters
        var dLat = ToRadians(point2.X - point.X);
        var dLon = ToRadians(point2.Y - point.Y);
        point.X = ToRadians(point.X);
        point2.X = ToRadians(point2.X);
   
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) + Math.Sin(dLon / 2) * Math.Sin(dLon / 2) * Math.Cos(point.X) * Math.Cos(point2.X);
        var c = 2 * Math.Asin(Math.Sqrt(a));
        return R * 2 * Math.Asin(Math.Sqrt(a));
    }
    
    private static double ToRadians(double angle) {
        return Math.PI * angle / 180.0;
    }
}