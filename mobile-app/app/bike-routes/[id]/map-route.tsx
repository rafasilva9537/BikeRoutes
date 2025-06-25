import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import MapView, {
    Marker,
    Region,
    Polyline,
    Circle
} from "react-native-maps";
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    Accuracy,
} from "expo-location";
import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@/constants/api";
import {useLocalSearchParams} from "expo-router";
import BikeRouteDetailsInterface from "@/interfaces/BikeRouteDetails";
import {useIsFocused} from "@react-navigation/native";

// TODO: remove when implement map service on backend
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

type MarkerType = {
    id: string;
    latitude: number;
    longitude: number;
    type: "origin" | "destination";
};

type OpenRouteServiceCoordinates = [longitude: number, latitude: number];

type RouteDirectionCoordinates = {
    latitude: number;
    longitude: number;
}

type RouteDirection = {
    distance: number;
    directions: RouteDirectionCoordinates[];
}

const fetchRouteDirections = async (origin: MarkerType, destination: MarkerType): Promise<RouteDirection> => {
    try {
        const URL = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;

        const response = await axios.get(URL);
        const coordinates: OpenRouteServiceCoordinates[] = response.data.features[0]?.geometry?.coordinates; // BE CAREFULL: Route directions as [longitude, latitude]
        const distanceInKm: number = response.data.features[0]?.properties?.summary?.distance / 1_000;

        if(coordinates){
            console.log("Route directions fetched.");

            const routeDirection = {
                distance: distanceInKm,
                directions: coordinates.map(c => ({ latitude: c[1], longitude: c[0] }))
            }
            return routeDirection;

        } else {
            console.warn("Unable to fetch route directions.");
            return { distance: 0, directions: [] };
        }
    } catch (error) {
        console.error("Unable to fetch route directions: ", error);
        return { distance: 0, directions: [] };
    }
}

const MapRoute = () => {
    const { id } = useLocalSearchParams();
    const routeId = Number(id);

    const [location, setLocation] = useState<LocationObject | null>(null);
    const [mapRegion, setMapRegion] = useState<Region | null>(null);
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [heading, setHeading] = useState<number | null>(null);
    const [routeDirection, setRouteDirection] = useState<RouteDirection>({ distance: 0, directions: [] });
    const [bikeRoute, setBikeRoute] = useState<BikeRouteDetailsInterface | null>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const options = { method: 'GET', url: `${API_URL}/bike-routes/${routeId}` };
            try {
                const { data } = await axios.request(options);
                setBikeRoute(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isFocused, routeId]);

    useEffect(() => {
        if(bikeRoute){
            setMarkers([
                {
                    id: "origin",
                    latitude: bikeRoute.startPath.x,
                    longitude: bikeRoute.startPath.y,
                    type: "origin",
                },
                {
                    id: "destination",
                    latitude: bikeRoute.endPath.x,
                    longitude: bikeRoute.endPath.y,
                    type: "destination",
                },
            ]);

            const centerLatitude = (bikeRoute.startPath.x + bikeRoute.endPath.x) / 2;
            const centerLongitude = (bikeRoute.startPath.y + bikeRoute.endPath.y) / 2;

            const latitudeDelta = Math.abs(bikeRoute.endPath.x - bikeRoute.startPath.x) * 1.5;
            const longitudeDelta = Math.abs(bikeRoute.endPath.y - bikeRoute.startPath.y) * 1.5;

            setMapRegion({
                latitude: centerLatitude,
                longitude: centerLongitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            });

        }
    }, [bikeRoute]);

    useEffect(() => {
        requestLocationPermissions();
    }, []);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync({
                accuracy: Accuracy.High,
            });
            updateLocation(currentPosition);

            await watchPositionAsync(
                {
                    accuracy: Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (newLocation) => {
                    updateLocation(newLocation);
                }
            );
        }
    }

    const updateLocation = (newLocation: LocationObject) => {
        setLocation(newLocation);
        setHeading(newLocation.coords.heading || null);
        // setMapRegion({
        //     latitude: newLocation.coords.latitude,
        //     longitude: newLocation.coords.longitude,
        //     latitudeDelta: 0.005,
        //     longitudeDelta: 0.005,
        // });
    };

    useEffect(() => {
        const updateRouteDirections = async () => {
            if(markers.length >= 2) {
                console.log("Fetching route directions...");
                const routeDirection: RouteDirection = await fetchRouteDirections(markers[0], markers[1]);

                setRouteDirection((prevRoute) => ({
                    ...prevRoute,
                    ...routeDirection
                }));
            }
        }
        updateRouteDirections();
    }, [markers]);

    const clearRoute = () => {
        setMarkers([]);
    };

    return (
        <View style={styles.container}>

            {mapRegion && (
                <MapView
                    style={styles.map}
                    region={mapRegion}
                    showsMyLocationButton={true}
                >
                    {location && (
                        <>
                            <Circle
                                center={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                }}
                                radius={location.coords.accuracy || 20}
                                strokeColor="rgba(0, 150, 255, 0.5)"
                                fillColor="rgba(0, 150, 255, 0.2)"
                            />
                            <Marker
                                coordinate={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                }}
                                anchor={{ x: 0.5, y: 0.5 }}
                                flat={true}
                                rotation={heading || 0}
                            >
                                <View style={styles.userLocationMarker}>
                                    <MaterialIcons name="navigation" size={24} color="white" />
                                </View>
                            </Marker>
                        </>
                    )}
                    {markers.length > 1 && (
                        <Polyline
                            coordinates={routeDirection.directions}
                            strokeColor="#3498db"
                            strokeWidth={4}
                        />
                    )}
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={marker.type === "origin" ? "Origem" : "Destino"}
                            description={marker.type}
                            pinColor={marker.type === "origin" ? colors.primary : "#e74c3c"}
                            onPress={clearRoute}
                        />
                    ))}
                </MapView>
            )}

        </View>
    );
};

export default MapRoute;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    map: { flex: 1 },
    userLocationMarker: {
        backgroundColor: colors.primary,
        padding: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    sheetContent: {
        padding: 20,
    }
});