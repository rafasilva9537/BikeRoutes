import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes";
import { TimerSvg, DistanceSvg, StarSvg } from "@/constants/icons";

const BikeRouteDetails = () => {
  const { id } = useLocalSearchParams();
  const routeId = Number(id);

  const route = bikeRoutes.find((route) => route.id === routeId);

  if (!route) {
    return (
      <View>
        <Text>Rota não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: route.image }} style={styles.image} />
      <Text style={styles.title}>{route.title}</Text>
      <Text style={styles.description}>{route.description}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <DistanceSvg />
          <Text>{route.distance} km</Text>
        </View>

        <View style={styles.infoBox}>
          <TimerSvg />
          <Text>
            {Math.floor(route.duration / 60)}:
            {(route.duration % 60).toString().padStart(2, "0")} hrs
          </Text>
        </View>

        <View style={styles.infoBox}>
          <StarSvg fill={"yellow"} />
          <Text>{route.rating}</Text>
        </View>
      </View>

      <Text style={styles.speed}>Velocidade média: {route.average_speed} km/h</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  speed: {
    fontSize: 16,
    marginTop: 10,
  }
});

export default BikeRouteDetails;
