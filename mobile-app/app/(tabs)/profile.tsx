import { colors } from "@/constants/colors";
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const client = { 
    firsName: "Marcos", 
    lastName: "Nunes",
    email: "marcos@email.com",
    phone: "61999999999",
    photo: require("@/assets/images/profile.png"),
}

const ProfileText = ({children}: any) => {
    return (
        <Text style={styles.profileText}>{children}</Text>
    );
}

const Profile = () => {
    return (
        <View style={styles.container}>
            <Image source={client.photo} style={styles.profilePhoto} />
            <View style={styles.profileInfo}>
                <ProfileText>Nome: {client.firsName} {client.lastName}</ProfileText>
                <ProfileText>Email: {client.email}</ProfileText>
                <ProfileText>Celular: {client.phone}</ProfileText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: colors.background
    },
    profilePhoto: {
        width: 250,
        height: 250,
        borderRadius: 200,
        marginBottom: 20,
        backgroundColor: "black"
    },
    profileText: {
        fontSize: 20,
    },
    profileInfo: {
        alignItems: "flex-start"
    }
});

export default Profile;