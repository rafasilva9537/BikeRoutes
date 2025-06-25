import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import MapView, {
  Marker,
  MapPressEvent,
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
import { CreateBikeRoute } from "@/interfaces/CreateBikeRoute";
import { API_URL } from "@/constants/api";

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

const fetchRouteDirections = async (origin: MarkerType, destination: MarkerType): Promise<OpenRouteServiceCoordinates[]> => {
  try {
    const URL = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`;

    const response = await axios.get(URL);
    const coordinates: OpenRouteServiceCoordinates[] = response.data.features[0]?.geometry?.coordinates; // BE CAREFULL: Route directions as [longitude, latitude]

    if(coordinates){
      console.log("Route directions fetched.");
      return coordinates;
    } else {
      console.warn("Unable to fetch route directions.");
      return [];
    }
  } catch (error) {
    console.error("Unable to fetch route directions: ", error);
    return [];
  }
}

const NewRoute = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [heading, setHeading] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [routeDirections, setRouteDirections] = useState<RouteDirectionCoordinates[]>([]);
  const [routeDirection, setRouteDirection] = useState<RouteDirection>({ distance: 0, directions: [] });

  const [routeData, setRouteData] = useState<CreateBikeRoute>({
    title: "",
    description: "",
    image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg",
    duration: 0,
    startPath: { x: 0, y: 0 },
    endPath: { x: 0, y: 0 },
  });

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
    setMapRegion({
      latitude: newLocation.coords.latitude,
      longitude: newLocation.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  useEffect(() => {
    const updateRouteDirections = async () => {
      console.log("Markers length: ", markers.length);
      if(markers.length >= 2) {
        console.log("Fetching route directions...");
        const openRouteServiceCoordinates = await fetchRouteDirections(markers[0], markers[1]);
        const formattedDirections: RouteDirectionCoordinates[] = openRouteServiceCoordinates.map(c => ({
          latitude: c[1],
          longitude: c[0]
        }));

        setRouteDirection((prevRoute) => ({
          ...prevRoute,
          directions: formattedDirections
        }));

      }
    }
    updateRouteDirections();
  }, [markers]);

  const handleMapPress = async (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;

    if (markers.length === 0 || markers.length === 2) {
      setMarkers([
        {
          id: "origin",
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          type: "origin",
        },
      ]);
    } else if (markers.length === 1) {
      setMarkers((prev) => [
        ...prev,
        {
          id: "destination",
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          type: "destination",
        },
      ]);
    }
  };

  const postRoute = async () => {
      if (routeData.title && markers.length >= 2) {
        // Get coordinates from markers
        const startMarker = markers.find(m => m.type === "origin");
        const endMarker = markers.find(m => m.type === "destination");

        if (!startMarker || !endMarker) {
          Alert.alert("Atenção", "Selecione origem e destino no mapa");
          return;
        }

        // Update routeData with coordinates
        const updatedRouteData = {
          ...routeData,
          startPath: { x: startMarker.latitude, y: startMarker.longitude },
          endPath: { x: endMarker.latitude, y: endMarker.longitude },
        };

      const options = {
        method: 'POST',
        url: `${API_URL}/bike-routes`,
        headers: {'Content-Type': 'application/json'},
        data: {
          title: updatedRouteData.title,
          description: updatedRouteData.description,
          image: updatedRouteData.image,
          startPath: updatedRouteData.startPath,
          endPath: updatedRouteData.endPath,
          duration: updatedRouteData.duration
        }
      };

      try {
        const { data } = await axios.request(options);
        console.log("Route was posted: ", data);
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("Atenção", "Preencha todos os campos e selecione origem/destino");
    }
  };

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
            onPress={handleMapPress}
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
      

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="edit-location-alt" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.sheetContent}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Rota do parque"
                value={routeData.title}
                onChangeText={(text) =>
                  setRouteData({ ...routeData, title: text })
                }
              />

              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={styles.input}
                value={routeData.description}
                onChangeText={(text) =>
                  setRouteData({ ...routeData, description: text })
                }
              />

              <Text style={styles.label}>Duração (min)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={routeData.duration?.toString()}
                onChangeText={(text) =>
                  setRouteData({ ...routeData, duration: parseInt(text) })
                }
              />


              {/* <Text style={styles.label}>Nota (1-5)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={routeData.rating}
                onChangeText={(text) =>
                  setRouteData({ ...routeData, rating: text })
                }
              /> */}

              <TouchableOpacity
                style={[styles.button, styles.searchButton]}
                onPress={() => {
                  setModalVisible(false);
                  postRoute();
                }}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Começar a pedalar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, { color: "#333" }]}>Fechar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewRoute;

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
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
    backgroundColor: "#f5f5f5",
  },
  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 999,
  },
});
