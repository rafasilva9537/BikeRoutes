import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return <Stack>
    <Stack.Screen 
      name="(tabs)"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen 
      name="bike-routes/[id]"
      options={{
        headerShown: false
      }}
    />

  </Stack>;
}

export default RootLayout;