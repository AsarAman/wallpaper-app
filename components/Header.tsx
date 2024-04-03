import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <MaterialIcons name="menu" size={28} color={"white"} />
      </View>

      <Text style={styles.text}>WallPlore</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",

    width: "100%",
    height: "100%",
  },
  icon: {
    width: "50%",
  },
  text: { color: "white", fontSize: 20, letterSpacing: 1 },
});
