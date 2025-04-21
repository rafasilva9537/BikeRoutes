import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet, TextInput } from "react-native";
import bikeRoutes from "@/mock_data/bike-routes";
import { colors } from "@/constants/colors";
import RouteBox from "@/components/RouteBox";
import { SearchSvg } from "@/constants/icons";

interface User {
  id: number,
  firsName: string,
  lastName: string,
  email: string,
  phone: string,
  photo: string,
}

const Header = ({setState}: any) => {
  return  (
    <View>
      <Text style={styles.headerTitle}>Rotas de Bicicleta</Text>
      <View style={styles.searchBar}>
        <SearchSvg style={styles.searchIcon}/>
        <TextInput 
          style={styles.searchInput}
          placeholder="Pesquisar por rota"
          onChangeText={(text) => setState(text)}
        />
      </View>
    </View>
  );
}

const Index = () => {
  const [searchText, setSearchText] = useState("");

  if(searchText === "")
  {
    return (
      <View style={styles.homepageContainer}>
        <FlatList
          ListHeaderComponent={ <Header setState={setSearchText}/> }
          ListHeaderComponentStyle={ styles.header }
          data= {bikeRoutes}
          renderItem={({item}) => <RouteBox {... item}/>}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.routeList}
        />
      </View>
    );
  }

  const filteredRoutes = bikeRoutes.filter((route) => route.title.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <View style={styles.homepageContainer}>
      <FlatList
        ListHeaderComponent={ <Header setState={setSearchText}/> }
        ListHeaderComponentStyle={ styles.header }
        data= {filteredRoutes}
        renderItem={({item}) => <RouteBox {... item}/>}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.routeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homepageContainer: {
    margin: 0,
    padding: 0,
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 15,
  },
  headerTitle: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: colors.accent,
    width: "100%",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 25,
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxHeight: 40,
    alignSelf: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  searchInput: {
    width: "91%",
    borderRadius: 25,
  },
  searchIcon: {

  },
  routeList: {
    width: "100%",
    gap: 15,
  },
});

export default Index;