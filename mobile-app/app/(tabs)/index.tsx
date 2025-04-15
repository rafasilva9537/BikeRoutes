import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes"
import { colors } from "@/constants/colors";
import { TimerSvg, DistanceSvg, StarSvg } from "@/constants/icons";

interface BikeRoute {
  id: number,
  title: string,
  image: string,
  description: string,
  duration: number, // minutes
  distance: number, // km
  rating: number, // 0 to 5
  average_speed: number // km/h
}

const RouteBox = (bikeRoute: BikeRoute) =>{ 
  return (
    <Link style={styles.routeBoxContainer} href={`/bike-routes/${bikeRoute.id}`} asChild>
      <TouchableOpacity>
        <Image source={ {uri: bikeRoute.image} } style={styles.routeImage}/>
        <View style={styles.routeInfoContainer}>
          <Text style={styles.routeTitle}>{bikeRoute.title}</Text>
          <View style={styles.routeBoxInfoDetails} >
            <View style={styles.routeIconInfoContainer}>
              <DistanceSvg/>
              <Text>{bikeRoute.distance} km</Text>
            </View>

            <View style={styles.routeIconInfoContainer}>
              <TimerSvg/>
              <Text>{Math.floor(bikeRoute.duration/60)}:{(bikeRoute.duration%60).toString().padEnd(2,"0")} hrs</Text>
            </View>

            <View style={styles.routeIconInfoContainer}>
              <StarSvg fill={"yellow"}/>
              <Text>{bikeRoute.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const Index = () => {
  return (
    <View style={styles.homepageContainer}>
      <FlatList
        ListHeaderComponent={<Text style={styles.homeTitle}>Rotas de Bicicleta</Text>}
        ListHeaderComponentStyle={{ backgroundColor: colors.accent, marginBottom: 15 }}
        data= {bikeRoutes}
        renderItem={({item}) => <RouteBox {... item}/>}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.routeList}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  homepageContainer: {
    margin: 0,
    padding: 0,
    flex: 1,
    backgroundColor: colors.background,
  },
  homeTitle: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  routeList: {
    width: "100%",
    gap: 15
  },
  routeBoxContainer: {
    width: "90%",
    alignItems: "center",
    alignSelf: "center"
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  routeImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  routeInfoContainer: {
    backgroundColor: colors.secondary,
    width: "100%",
    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 5
  },
  routeBoxInfoDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  routeIconInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export default Index;