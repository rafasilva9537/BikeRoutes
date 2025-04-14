import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes"
import { colors } from "@/constants/colors";

interface BikeRoute {
  id: number,
  title: string,
  image: string,
  description: string,
  duration: number,
  distance: number,
  rating: number,
  average_speed: number
}

const RouteBox = (bikeRoute: BikeRoute) =>{ 
  return (
    <Link style={styles.routeBoxContainer} href={`/bike-routes/${bikeRoute.id}`} asChild>
      <TouchableOpacity>
        <Image source={ {uri: bikeRoute.image} } style={styles.routeImage}/>
        <Text style={styles.routeTitle}>{bikeRoute.title}</Text>
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
        numColumns={2}
        contentContainerStyle={styles.routeList}
        columnWrapperStyle={styles.routeRowContainer}
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
  },
  routeRowContainer: {
    width: "100%",
    gap: 10,
    justifyContent: "center",
    paddingBottom: 15
  },
  routeBoxContainer: {
    width: "45%",
  },
  routeTitle: {
    fontSize: 16,
  },
  routeImage: {
    width: "100%",
    height: 100,
    borderRadius: 5
  }
});

export default Index;