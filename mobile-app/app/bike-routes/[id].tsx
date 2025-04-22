import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes";
import users from "@/mock_data/users";
import { TimerSvg, DistanceSvg, StarSvg } from "@/constants/icons";
import { colors } from "@/constants/colors";

const BikeRouteDetails = () => {
  const { id } = useLocalSearchParams();
  const routeId = Number(id);
  const router = useRouter();

  const route = bikeRoutes.find((route) => route.id === routeId);
  const user = users.find((user) => user.id === route?.userId);

  if (!route) {
    return (
      <View>
        <Text>Rota não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
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

      <View style={styles.user}>
        <Image source={{uri: user?.photo}} style={styles.userPhoto}/>
        <Text style={styles.username}>{user?.firsName} {user?.lastName}</Text>
      </View>

      <Image source={require("@/assets/images/maps_route.png")} style={styles.image} />
      
      <View style={styles.ratingContainer}>
        <StarSvg fill={"yellow"}></StarSvg>
        <StarSvg fill={"yellow"}></StarSvg>
        <StarSvg fill={"yellow"}></StarSvg>
        <StarSvg fill={"yellow"}></StarSvg>
        <StarSvg></StarSvg>
      </View>
    </ScrollView>

    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    height: "92%",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
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
    marginBottom: 10,
  },
  user: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    width: "90%",
    padding: 5,
    gap: 10
  },
  userPhoto: {
    width: 40, 
    height: 40,
    borderRadius: 30,
  },
  username: {
    fontWeight: "bold"
  },
  ratingContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    width: "90%",
    padding: 5,
    gap: 10,
    justifyContent: "space-evenly"
  },
  button: {
    width: "90%",
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  }
});

export default BikeRouteDetails;
