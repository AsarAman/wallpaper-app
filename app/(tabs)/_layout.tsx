import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, usePathname, Stack } from "expo-router";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
//import { Stack } from 'expo-router/stack';

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import { Route } from "expo-router";
import { useRoute } from "@react-navigation/native";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: { backgroundColor: "#1a2230" },
      }}
    >
      <Tabs.Screen
        options={{
          // headerTitle:() => <Header/> ,
          headerStyle: {
            backgroundColor: "#121520",
          },
          headerTitleStyle: { color: "white" },
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
        name="index"
      />
      <Tabs.Screen
        options={{
          // headerTitle:() => <Header/> ,
          headerStyle: {
            backgroundColor: "#121520",
          },
          headerTitleStyle: { color: "white" },
          title: "Category",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={24} color={color} />
          ),
        }}
        name="category"
      />
      <Tabs.Screen
        options={{
          // headerTitle:() => <Header/> ,
          headerStyle: {
            backgroundColor: "#121520",
          },
          headerTitleStyle: { color: "white" },
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="heart" color={color} />
          ),
        }}
        name="saved"
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          title: "Detail",
          href: null,
          tabBarStyle: { display: "none" },
        }}
        name="wallpaperdetail"
      
      />
    </Tabs>
  );
}

 
function createStackNavigator() {
  throw new Error("Function not implemented.");
}
