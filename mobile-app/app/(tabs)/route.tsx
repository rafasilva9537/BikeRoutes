import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import axios from "axios";

const GOOGLE_API_KEY = "KEY_API_GOOGLE";

const Route = () => {
  const [originText, setOriginText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [originMarker, setOriginMarker] = useState<LatLng | null>(null);
  const [destinationMarker, setDestinationMarker] = useState<LatLng | null>(null);

  const geocodeAddress = async (address: string) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: GOOGLE_API_KEY,
        },
      }
    );
    const location = response.data.results[0]?.geometry.location;
    if (!location) throw new Error("Endereço não encontrado");
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  };

  const fetchRoute = async () => {
    try {
      const origin = await geocodeAddress(originText);
      const destination = await geocodeAddress(destinationText);

      setOriginMarker(origin);
      setDestinationMarker(destination);

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`;

      const response = await axios.get(url);
      const points = decodePolyline(
        response.data.routes[0].overview_polyline.points
      );
      setRouteCoords(points);
    } catch (error) {
      console.error("Erro ao obter rota:", error);
    }
  };

  const decodePolyline = (t: string): LatLng[] => {
    let points: LatLng[] = [];
    let index = 0, lat = 0, lng = 0;

    while (index < t.length) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Origem"
          style={styles.input}
          value={originText}
          onChangeText={setOriginText}
        />
        <TextInput
          placeholder="Destino"
          style={styles.input}
          value={destinationText}
          onChangeText={setDestinationText}
        />
        <TouchableOpacity style={styles.button} onPress={fetchRoute}>
          <Text style={styles.buttonText}>Traçar Rota</Text>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {originMarker && <Marker coordinate={originMarker} pinColor="green" />}
        {destinationMarker && <Marker coordinate={destinationMarker} pinColor="red" />}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeColor="blue" strokeWidth={4} />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginRight: 5,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});

export default Route;
