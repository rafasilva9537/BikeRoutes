import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const BikeRouteDetails = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Rota de bicicle pelo ID aqui.</Text>
            <Text>Route ID: {id}</Text>
        </View>
    )
}

export default BikeRouteDetails;