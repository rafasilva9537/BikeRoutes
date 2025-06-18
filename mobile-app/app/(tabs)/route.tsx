import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
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
  Circle,
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

const GOOGLE_MAPS_API_KEY = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao";

type MarkerType = {
  id: string;
  latitude: number;
  longitude: number;
  type: "origin" | "destination";
  address: string;
};

const NewRoute = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [heading, setHeading] = useState<number | null>(null);
  const [touchedPoints, setTouchedPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [routeData, setRouteData] = useState({
    title: "",
    duration: "",
    distance: "",
    rating: "",
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

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      }
      return `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
    } catch (error) {
      console.error("Erro no geocoding:", error);
      return `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = async (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    const address = await reverseGeocode(coordinate.latitude, coordinate.longitude);

    if (touchedPoints === 0) {
      setOrigin(address);
      setMarkers([
        {
          id: "origin",
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          type: "origin",
          address: address,
        },
      ]);
      setTouchedPoints(1);
    } else {
      setDestination(address);
      setMarkers((prev) => [
        ...prev,
        {
          id: "destination",
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          type: "destination",
          address: address,
        },
      ]);
      setTouchedPoints(0);
    }
  };

  const handleSearch = () => {
    if (origin && destination && routeData.title) {
      Alert.alert(
        "Rota definida",
        `Origem: ${origin}\nDestino: ${destination}\nTítulo: ${routeData.title}`
      );
    } else {
      Alert.alert("Atenção", "Preencha todos os campos e selecione origem/destino");
    }
  };

  const clearRoute = () => {
    setOrigin("");
    setDestination("");
    setMarkers([]);
    setTouchedPoints(0);
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
                coordinates={markers.map((m) => ({
                  latitude: m.latitude,
                  longitude: m.longitude,
                }))}
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
                description={marker.address}
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

              <Text style={styles.label}>Duração (min)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={routeData.duration}
                onChangeText={(text) =>
                  setRouteData({ ...routeData, duration: text })
                }
              />

              <Text style={styles.label}>Distância (km)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={routeData.distance}
                onChangeText={(text) =>
                  setRouteData({ ...routeData, distance: text })
                }
              />

              <Text style={styles.label}>Nota (1-5)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={routeData.rating}
                onChangeText={(text) =>
                  setRouteData({ ...routeData, rating: text })
                }
              />

              <TouchableOpacity
                style={[styles.button, styles.searchButton]}
                onPress={() => {
                  setModalVisible(false);
                  handleSearch();
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
