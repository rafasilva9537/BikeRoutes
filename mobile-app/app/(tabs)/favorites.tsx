import { Text, View, FlatList, StyleSheet } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes";
import RouteBox from "@/components/RouteBox";
import { colors } from "@/constants/colors";

const Favorites = () => {
    const favoritesRoutes = [];
    favoritesRoutes.push(bikeRoutes[3]);
    favoritesRoutes.push(bikeRoutes[5]);
    favoritesRoutes.push(bikeRoutes[0]);

    return (
        <View style={styles.homepageContainer}>
        <FlatList
            ListHeaderComponent={<Text style={styles.homeTitle}>Favoritos</Text>}
            ListHeaderComponentStyle={{ backgroundColor: colors.accent, marginBottom: 15 }}
            data= {favoritesRoutes}
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

export default Favorites;