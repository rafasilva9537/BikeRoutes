import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, MapPressEvent, Region, Polyline, Circle } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, Accuracy } from "expo-location";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";


const GOOGLE_MAPS_API_KEY = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao";

const NewRoute = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [markers, setMarkers] = useState<Array<{
    id: string;
    latitude: number;
    longitude: number;
    type: 'origin' | 'destination';
    address?: string;
  }>>([]);
  const [heading, setHeading] = useState<number | null>(null);
  const [touchedPoints, setTouchedPoints] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync({
        accuracy: Accuracy.High
      });
      updateLocation(currentPosition);

      await watchPositionAsync({
        accuracy: Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      }, (newLocation) => {
        updateLocation(newLocation);
      });
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

  useEffect(() => { requestLocationPermissions(); }, []);

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
      setMarkers([{
        id: 'origin',
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        type: 'origin',
        address: address
      }]);
      setTouchedPoints(1);
    } else {
      setDestination(address);
      setMarkers(prev => [
        ...prev,
        {
          id: 'destination',
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          type: 'destination',
          address: address
        }
      ]);
      setTouchedPoints(0);
    }
  };

  const handleSearch = () => {
    if (origin && destination) {
      Alert.alert("Rota definida", `Origem: ${origin}\nDestino: ${destination}`);
    } else {
      Alert.alert("Atenção", "Defina origem e destino no mapa primeiro!");
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.searchBar}
      >
        <TextInput
          style={styles.input}
          placeholder="Origem"
          value={origin}
          onChangeText={setOrigin}
          editable={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Destino"
          value={destination}
          onChangeText={setDestination}
          editable={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.searchButton]}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Começar a pedalar</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>


      {mapRegion && (
        <MapView
          style={styles.map}
          region={mapRegion}
          showsUserLocation={false}
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
                  <View style={styles.arrow} />
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
    title={marker.type === 'origin' ? 'Origem' : 'Destino'}
    description={marker.address}
    pinColor={marker.type === 'origin' ? colors.primary : '#e74c3c'}
    onPress={clearRoute} // <- aqui está o segredo
  />
))}
        </MapView>
      )}
    </View>
  );
};

export default NewRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: colors.background,
  },
  searchBar: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  searchButton: {
    backgroundColor: colors.primary,
  },
  clearButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  userLocationMarker: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 1,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primary,
    transform: [{ rotate: '180deg' }],
    marginTop: 0,
  },
});