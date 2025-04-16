import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";
import {bikeRoutes} from "mock_data/bike-routes"

// Contador de IDs de cada rota
let routeIdCounter = 0;


//Componente que renderiza o mapa e gerencia as lógicas (marcadores, localização..)
const newRoute = () => {
  const [location, setLocation] = useState<LocationObject | null>(null); // Guarda a localização atual do usuário, ou não (null)
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [markers, setMarkers] = useState<Array<{
    id: string;
    latitude: number;
    longitude: number;
  }>>([]);

  
  //Função para pedir/pegar permissão de localização
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);

      console.log("Localização atual =>", currentPosition);

      setMapRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        
        //Precision 
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }

  //requestLocationPermissions é chamado para iniciar o processo de pegar localização.
  useEffect(() => { requestLocationPermissions(); }, []);

  // para colocar o marcador no mapa quando o usuário tocar no mapa..
  // Deve ser necessário um modo de alternar (sem adicionar)
  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    const novoMarcador = {
      id: `rota-${++routeIdCounter}`,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    };

    setMarkers((prev) => [...prev, novoMarcador]);
    console.log("Marcador adicionado:", novoMarcador);
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

  //Return...
  return (
    <View style={styles.container}>
    {mapRegion && (
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={handleMapPress}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={`ID: ${marker.id}`}
            description="Marcador de rota"/>
            ))}
        </MapView>
      )}


      //Side bar

      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}> Rotas</Text>
        
        <FlatList
        data={markers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
          style = {styles.routeItem}
          onPress={() => handleMarkerSelect(item)}>
            <Text style={styles.routeText}> {item.id}</Text>
          </TouchableOpacity>
        )}/>
      </View>
    </View>
  );
};


export default newRoute;


const { width } = Dimensions.get("window");
const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
  },
  map: {
    flex: 1,
    width: width * 0.75, // 75% da tela para o mapa
  },
  sidebar: {
    width: width * 0.25, // 25% da tela para a barra lateral
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
  },
  sidebarTitle: {
    marginBottom: 10,
    fontSize: 16,
  },
  routeItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#40fbac",
  },
  routeText: {
    fontSize: 15,
  },
});
