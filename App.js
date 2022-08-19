import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

export default function App() {
  const [relode, setrelode] = useState(false);
  const Relode = () => {
    setrelode(!relode);
  };
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(DATA);
  const [masterDataSource, setMasterDataSource] = useState(DATA);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
    }
  };

  const addRandomData = async () => {
    // program to generate random strings

    const result = Math.random().toString(36).substring(2, 7);
    var newData = masterDataSource;
    newData.push({ id: masterDataSource.length + 1, title: result });
    await setMasterDataSource(newData);
    Relode();
    setSearch("");
  };

  const RednerItem = ({ item }) => {
    return (
      <View
        style={{
          margin: 10,
          borderWidth: 1,
          height: 40,
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "600", paddingHorizontal: 10 }}
        >
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>List App</Text>
      <View style={styles.top}>
        <TextInput
          style={styles.search}
          placeholder="Search"
          value={search}
          onChangeText={(text) => {
            searchFilterFunction(text);
            setSearch(text);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.4}
          style={{ marginHorizontal: 10 }}
          onPress={addRandomData}
        >
          <Ionicons name="ios-add-circle-sharp" size={35} color="#03fcb1" />
        </TouchableOpacity>
      </View>
      <View style={styles.listView}>
        <FlatList
          extraData={relode}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RednerItem}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "center",
  },
  top: {
    marginHorizontal: 10,
    flexDirection: "row",
  },
  search: {
    width: "85%",
    height: 30,
    fontSize: 20,
    alignSelf: "flex-start",
    borderBottomWidth: 2,
    borderColor: "#03fcb1",
  },
});
