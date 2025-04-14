import { Tabs } from "expo-router";
import { HomeSvg, ProfileSvg, StarSvg, PlusCircleSvg } from "@/constants/icons";
import { StyleSheet, View, Text } from "react-native"
import React from "react";
import { colors } from "@/constants/colors";
import { SvgProps } from "react-native-svg";

interface TabIconProps {
    focused: boolean, 
    SvgIcon: React.FC<SvgProps> // used to show 'imported svg'
}

const TabText = ({children} : any) => {
    return (
        <Text style={{fontSize: 14}}>{children}</Text>
    )
}

const TabIcon = ({ focused, SvgIcon }: TabIconProps) => {
    if(focused){
        return (
            <View style={[styles.tabIcon, styles.focusedTabIcon]}>
                <SvgIcon width={30} height={30}/>
            </View>
        )
    }
 
    return (
        <View style={styles.tabIcon}>
            <SvgIcon width={30} height={30}/>
        </View>
    )
}

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
            }} 
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Homepage",
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} SvgIcon={HomeSvg} />
                }}
            />
            <Tabs.Screen 
                name="new-route"
                options={{
                    title: "Nova Rota",
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} SvgIcon={PlusCircleSvg} />
                }}
            />
            <Tabs.Screen 
                name="favorites"
                options={{
                    title: "Favoritos",
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} SvgIcon={StarSvg} />
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Perfil",
                    headerShown: false,
                    tabBarIcon: ({focused}) => <TabIcon focused={focused} SvgIcon={ProfileSvg} />
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        gap: 0,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 75,
        minHeight: 40,
        borderRadius: 50,
        top: "20%",
        padding: 1,
    },
    focusedTabIcon: {
        backgroundColor: colors.accent,
    },
});

export default Layout;