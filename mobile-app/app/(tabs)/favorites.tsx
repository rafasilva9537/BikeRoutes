import { Text, View, FlatList, StyleSheet } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes";
import RouteBox from "@/components/RouteBox";
import { colors } from "@/constants/colors";

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
        <View style={styles.homepageContainer}>
        <FlatList
            ListHeaderComponent={<Header />}
            ListHeaderComponentStyle={styles.header}
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
    header: {
        marginBottom: 15
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