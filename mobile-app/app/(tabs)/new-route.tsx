import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker, MapPressEvent, Region, Polyline } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";
import { colors } from "@/constants/colors";
import { bikeRoutes } from "mock_data/bike-routes";

// Contador de IDs de cada rota
let routeIdCounter = 0;

// Componente que renderiza o mapa e gerencia as lógicas (marcadores, localização..)
const NewRoute = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);

  const [markers, setMarkers] = useState<Array<{
    id: string;
    latitude: number;
    longitude: number;
  }>>([]);

  // Função para pedir/pegar permissão de localização
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);

      console.log("Localização atual =>", currentPosition);

      setMapRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }

  useEffect(() => { requestLocationPermissions(); }, []);

  // Quando tocar no mapa, adiciona ou remove marcador
  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;

    const marcadorExistente = markers.find(
      (m) =>
        m.latitude === coordinate.latitude &&
        m.longitude === coordinate.longitude
    );

    if (marcadorExistente) {
      setMarkers((prev) =>
        prev.filter(
          (m) =>
            m.latitude !== coordinate.latitude ||
            m.longitude !== coordinate.longitude
        )
      );
    } else {
      const novoMarcador = {
        id: `rota-${++routeIdCounter}`,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      };

      setMarkers((prev) => [...prev, novoMarcador]);
      console.log("Marcador adicionado:", novoMarcador);
    }
  };

  const handleMarkerSelect = (marker: typeof markers[0]) => {
    if (mapRegion) {
      setMapRegion({
        ...mapRegion,
        latitude: marker.latitude,
        longitude: marker.longitude,
      });
    }
  };

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView
          style={styles.map}
          region={mapRegion}
          onPress={handleMapPress}
        >
          {markers.length > 1 && (
            <Polyline
              coordinates={markers.map((m) => ({
                latitude: m.latitude,
                longitude: m.longitude,
              }))}
              strokeColor="#FF0000"
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
              title={`ID: ${marker.id}`}
            />
          ))}
        </MapView>
      )}

    
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>Rotas</Text>

        <FlatList
          data={markers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.routeItem}
              onPress={() => handleMarkerSelect(item)}
            >
              <Text style={styles.routeText}>{item.id}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default NewRoute;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
  },
  map: {
    flex: 1,
    width: '75%',
  },
  sidebar: {
    width: '25%',
    backgroundColor: colors.background,
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: colors.primary,
  },
  sidebarTitle: {
    marginBottom: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  routeItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  routeText: {
    fontSize: 16,
    textAlign: "center",
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    borderWidth: 1,
  },
});