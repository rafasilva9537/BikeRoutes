import React from "react";
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes";
import { colors } from "@/constants/colors";
import RouteBox from "@/components/RouteBox";

interface User {
  id: number,
  firsName: string,
  lastName: string,
  email: string,
  phone: string,
  photo: string,
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

const styles = StyleSheet.create({
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
    gap: 15,
  },
});

export default Index;