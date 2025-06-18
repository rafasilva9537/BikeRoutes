import { Text, View, FlatList, StyleSheet } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes";
import CompactRouteBox from "@/components/CompactRouteBox";
import { colors } from "@/constants/colors";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
    return  (
      <View>
        <Text style={styles.headerTitle}>Favoritos</Text>
      </View>
    );
  }

const Favorites = () => {
    const favoritesRoutes = [];
    favoritesRoutes.push(bikeRoutes[3]);
    favoritesRoutes.push(bikeRoutes[5]);
    favoritesRoutes.push(bikeRoutes[0]);

    return (
        <SafeAreaView edges={["top"]} style={styles.homepageContainer}>
        <FlatList
            ListHeaderComponent={<Header />}
            ListHeaderComponentStyle={styles.header}
            data= {favoritesRoutes}
            renderItem={({item}) => <CompactRouteBox {... item}/>}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.routeList}
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homepageContainer: {
        margin: 0,
        padding: 0,
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        marginBottom: 1
    },
    headerTitle: {
        alignSelf: "center",
        marginBottom: 10,
        fontSize: 30,
        fontWeight: "bold",
        backgroundColor: colors.accent,
        width: "100%",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    routeList: {
        width: "100%",
        gap: 15,
    },
});

export default Favorites;