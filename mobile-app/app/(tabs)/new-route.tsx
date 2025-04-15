import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";

// Contador de IDs de cada rota
let routeIdCounter = 0;


//Componente que renderiza o mapa e gerencia as lógicas (marcadores, localização..)
const newRoute = () => {
  const [location, setLocation] = useState<LocationObject | null>(null); // Guarda a localização atual do usuário, ou não (null)
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
    }
  }

  //requestLocationPermissions é chamado para iniciar o processo de pegar localização.
  useEffect(() => { requestLocationPermissions(); }, []);


  // para colocar o marcador no mapa quando o usuário tocar no mapa..
  // Deve ser necessário um modo de alternar (sem adicionar)
  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    const newMarker = {
      id: `rota-${++routeIdCounter}`,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    };

    setMarkers((prev) => [...prev, newMarker]);
    console.log("Marcador adicionado:", newMarker);
  };

  //Return...
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          
          onPress={handleMapPress} >
          
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
    </View>
  );
};

export default newRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
