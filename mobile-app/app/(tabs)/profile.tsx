import { colors } from "@/constants/colors";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView, FlatList } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes";
import CompactRouteBox from "@/components/CompactRouteBox";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import BikeRouteMainInfo from "@/interfaces/BikeRouteMainInfo";
import { API_URL } from "@/constants/api";
import axios from "axios";
import User from "@/interfaces/User";

const ProfileText = ({children}: any) => {
    return (
        <Text style={styles.profileText}>{children}</Text>
    );
}

const ProfileInfo = () => {
    const [user, setUser] = useState<User>();
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const options = { method: 'GET', url: `${API_URL}/accounts/1` };
            try {
                const { data } = await axios.request(options);
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isFocused]);

    if (!user) {
        return (
            <View style={styles.profileInfoContainer}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.profileInfoContainer}>
            <Image source={ {uri: user.photo} } style={styles.profilePhoto} />
            <View style={styles.profileInfo}>
                <ProfileText>Nome: {user.firstName} {user.lastName}</ProfileText>
                <ProfileText>Email: {user.email}</ProfileText>
                <ProfileText>Celular: {user.phone}</ProfileText>
            </View>
            <Text style={styles.myRoutesHeader}>Minhas Rotas</Text>
        </View>
    );
}

const Profile = () => {
    const [userBikeRoutes, setUserBikeRoutes] = useState<BikeRouteMainInfo[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const options = { method: 'GET', url: `${API_URL}/bike-routes/favorites` };
            try {
                const { data } = await axios.request(options);
                setUserBikeRoutes(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isFocused]);

    return (
        <SafeAreaView edges={["top"]}>
        <FlatList
            ListHeaderComponent={ <ProfileInfo /> }
            data= {userBikeRoutes}
            renderItem={({item}) => <CompactRouteBox {... item}/>}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.routeList}
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileInfoContainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: colors.background
    },
    myRoutesHeader: {
        marginTop: 25,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "left"
    },
    profilePhoto: {
        width: 200,
        height: 200,
        borderRadius: 200,
        marginBottom: 15,
        backgroundColor: "black"
    },
    profileText: {
        fontSize: 20,
        padding: 10,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
    },
    profileInfo: {
        justifyContent: 'center',
        gap: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%"
    },
    routeList: {
        width: "100%",
        gap: 15,
        backgroundColor: colors.background,
    },
});

export default Profile;