import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Homepage",
                    headerShown: false
                }}
            />
            <Tabs.Screen 
                name="new-route"
                options={{
                    title: "Nova Rota",
                    headerShown: false
                }}
            />
            <Tabs.Screen 
                name="favorites"
                options={{
                    title: "Favoritos",
                    headerShown: false
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Perfil",
                    headerShown: false
                }}
            />
        </Tabs>
    )
}

export default Layout;