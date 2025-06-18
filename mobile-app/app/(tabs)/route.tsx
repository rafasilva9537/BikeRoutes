import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
  Image,
} from "react-native";
import MapView, { Marker, Polyline, Region, MapPressEvent } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import axios from "axios";
import { colors } from "@/constants/colors";

const NewRoute = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [touchedPoints, setTouchedPoints] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const fixedImageUrl = "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg";

  useEffect(() => {
    (async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const pos = await getCurrentPositionAsync({});
        setLocation(pos);
        setMapRegion({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        watchPositionAsync(
          {
            accuracy: Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (newLocation) => {
            setLocation(newLocation);
          }
        );
      }
    })();
  }, []);

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;

    const newMarker = {
      id: touchedPoints === 0 ? "origin" : "destination",
      type: touchedPoints === 0 ? "origin" : "destination",
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    };

    if (touchedPoints === 0) {
      setMarkers([newMarker]);
      setTouchedPoints(1);
    } else {
      setMarkers((prev) => [...prev, newMarker]);
      setTouchedPoints(0);
    }
  };

  const clearAll = () => {
    setTitle("");
    setDescription("");
    setDuration("");
    setMarkers([]);
    setTouchedPoints(0);
  };

  const sendRoute = async () => {
    if (markers.length < 2) {
      Alert.alert("Erro", "Marque origem e destino no mapa.");
      return;
    }

    if (!title || !description || !duration) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      title,
      description,
      image: fixedImageUrl,
      startPath: {
        x: markers[0].latitude,
        y: markers[0].longitude,
      },
      endPath: {
        x: markers[1].latitude,
        y: markers[1].longitude,
      },
      duration: parseInt(duration),
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8081/bike-routes", payload);
      console.log("Rota enviada:", response.data);
      Alert.alert("Sucesso", "Rota cadastrada com sucesso!");
      clearAll();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      Alert.alert("Erro", "Falha ao enviar a rota.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Rota do Lago"
        />

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descreva sua rota"
          multiline
        />

        <Text style={styles.label}>Duração estimada (min) *</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          placeholder="Ex: 45"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Imagem fixa</Text>
        <Image
          source={{ uri: fixedImageUrl }}
          style={styles.previewImage}
          resizeMode="cover"
        />

        <Text style={styles.label}>Toque no mapa para escolher origem e destino</Text>
      </ScrollView>

      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={handleMapPress}
        showsUserLocation={true}
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            title={m.type === "origin" ? "Origem" : "Destino"}
            pinColor={m.type === "origin" ? colors.primary : "#e74c3c"}
          />
        ))}

        {markers.length === 2 && (
          <Polyline
            coordinates={markers.map((m) => ({
              latitude: m.latitude,
              longitude: m.longitude,
            }))}
            strokeColor={colors.primary}
            strokeWidth={4}
          />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={sendRoute} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Começar a pedalar</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewRoute;

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginTop: 10,
  },
  map: {
    height: 300,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
