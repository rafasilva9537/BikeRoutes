import { Link } from "expo-router";
import { TimerSvg, DistanceSvg, StarSvg } from "@/constants/icons";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import React from "react";
import BikeRouteMainInfo from "@/interfaces/BikeRouteMainInfo";

const CompactRouteBox = (bikeRoute: BikeRouteMainInfo) => {
    return (
        <Link style={styles.routeBoxContainer} href={`/bike-routes/${bikeRoute.id}`} asChild>
        <TouchableOpacity>
            <Image source={ {uri: bikeRoute.image} } style={styles.routeImage}/>
            <View style={styles.routeInfoContainer}>
                <View style={ styles.completeInfoContainer }>
                    <Text style={styles.routeTitle}>{bikeRoute.title}</Text>
                    <Text style={{ textDecorationLine: "underline" }}>{bikeRoute.userMainInfo.firstName} {bikeRoute.userMainInfo.lastName}</Text>
                    <View style={styles.routeBoxInfoDetails} >
                        <View style={styles.routeIconInfoContainer}>
                            <DistanceSvg/>
                            <Text>{bikeRoute.distance.toPrecision(2)} km</Text>
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
        // alignItems: "center",
        alignSelf: "center",
        flexDirection: "row"
    },
    routeTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    routeImage: {
        width: "30%",
        minHeight: 90,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    routeInfoContainer: {
        flexDirection: "row",
        backgroundColor: colors.secondary,
        width: "70%",
        alignItems: "center",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: 10,
        gap: 10,
    },
    completeInfoContainer: {
        width: "100%",
        height: 80,
        justifyContent: "space-between",
        gap: 2,
    },
    routeBoxInfoDetails: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    routeIconInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
    }
});

export default CompactRouteBox;