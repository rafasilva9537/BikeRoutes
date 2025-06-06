import { Link } from "expo-router";
import { TimerSvg, DistanceSvg, StarSvg } from "@/constants/icons";
import users from "@/mock_data/users";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";

interface BikeRoute {
    id: number,
    userId: number
    title: string,
    image: string,
    description: string,
    duration: number, // minutes
    distance: number, // km
    rating: number, // 0 to 5
    average_speed: number // km/h
}

const RouteBox = (bikeRoute: BikeRoute) => {
    const user = users.filter(user => user.id == bikeRoute.userId)[0];

    return (
        <Link style={styles.routeBoxContainer} href={`/bike-routes/${bikeRoute.id}`} asChild>
        <TouchableOpacity>
            <Image source={ {uri: bikeRoute.image} } style={styles.routeImage}/>
            <View style={styles.routeInfoContainer}>
            <Image source={ {uri: user.photo} } style={styles.profileImage} />
            <View style={{}}>
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
            </View>
        </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    routeBoxContainer: {
        width: "90%",
        alignItems: "center",
        alignSelf: "center"
    },
    routeTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    routeImage: {
        width: "100%",
        height: 150,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    routeInfoContainer: {
        flexDirection: "row",
        backgroundColor: colors.secondary,
        width: "100%",
        alignItems: "center",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 5,
        gap: 10
    },
    profileImage: {
        width: "14%",
        height: 45,
        borderRadius: 30
    },
    routeBoxInfoDetails: {
        width: "86%",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    routeIconInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
    }
});

export default RouteBox;