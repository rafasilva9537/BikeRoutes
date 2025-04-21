import { colors } from "@/constants/colors";
import React from "react";
import { Text, View, Image, StyleSheet, ScrollView, FlatList } from "react-native";
import users from "@/mock_data/users";
import bikeRoutes from "@/mock_data/bike-routes";
import CompactRouteBox from "@/components/CompactRouteBox";

const user = users[0];

const ProfileText = ({children}: any) => {
    return (
        <Text style={styles.profileText}>{children}</Text>
    );
}

const ProfileInfo = () => {
    return (
        <View style={styles.profileInfoContainer}>
            <Image source={ {uri: user.photo} } style={styles.profilePhoto} />
            <View style={styles.profileInfo}>
                <ProfileText>Nome: {user.firsName} {user.lastName}</ProfileText>
                <ProfileText>Email: {user.email}</ProfileText>
                <ProfileText>Celular: {user.phone}</ProfileText>
            </View>
            <Text style={styles.myRoutesHeader}>Minhas Rotas</Text>
        </View>
    );
}

const Profile = () => {
    const userBikeRoutes = bikeRoutes.filter(route => route.userId === 1);

    return (
        <FlatList
            ListHeaderComponent={ <ProfileInfo /> }
            data= {userBikeRoutes}
            renderItem={({item}) => <CompactRouteBox {... item}/>}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.routeList}
        />
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