import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { useNavigation } from "expo-router";
import Header from "@/components/Header";
import { useLayoutEffect } from "react";
import { useData } from "../context/context";
import { FlatList } from "react-native";

export default function TabTwoScreen() {
  const { category, fetchCategories } = useData();
  console.log(category[0], "1st");
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
    });
  }, [navigation]);
  return (
    <FlatList
      style={styles.container}
      data={category}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("index", {id:item.id})}
          style={styles.category}
          key={item.id}
        >
          <Image
            source={{ uri: item.coverPhoto }}
            style={{ height: 200, width: "100%", borderRadius: 10 }}
          />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}

      
     
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  category: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    paddingLeft: 5,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
