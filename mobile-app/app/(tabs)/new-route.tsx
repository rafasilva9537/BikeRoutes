import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location'

const newRoute = () => {
const[location, setLocation] = useState <LocationObject | null> (null);
  
  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if(granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);

      console.log("Localizacao atual =>", currentPosition);
    }
    
  }
  

useEffect(() => {
  requestLocationPermissions();
},[]);

  return (
        <View style={styles.container}>

          <MapView style={styles.map} />




            
        </View>
    )
}

export default newRoute;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },

  map:{
    flex: 1,
    width: '100%',

  } 

});

