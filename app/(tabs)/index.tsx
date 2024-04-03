import {
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";

import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "@/components/Header";
import { useData } from "../context/context";
import { Link } from "expo-router";
export default function TabOneScreen() {
  const { id } = useLocalSearchParams();

  console.log(typeof id, "iddd");
  const { images, fetchWalls, setCategories, resetImages } = useData();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const router = useRouter()

  //console.log(images.length, "images");

  const categoriesq = [
    "wallpapers",
    "beach",
    "painting",
    "ai",

    "nature",
    "patterns",
    "film",
    "street",
    "travel",
    "animals",
    "art",
    "cars",
    "love",
    "landscape",
    "sunset",
    "abstract",
    "spiritual",
    "technology",
    "funny",
    "logos",
    "sayings",
    "space",
    "comics",
    "music",
    "drawings",
    "nfts",
    "anime",
    "trending",
    "girls",
    "hollywood",
    "rain",
  ];

  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      resetImages();
      fetchWalls(id.toString());
    }
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
    });
  }, [navigation]);
  return (
    <View style={styles.view}>
      {!id && (
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          horizontal
        >
          {categoriesq.map((category, index) => {
            return (
              <Text
                style={[
                  styles.category,
                  selectedCategory === index ? styles.active : null,
                ]}
                key={index}
                onPress={() => {
                  setSelectedCategory(index);
                  setCategories(category);
                }}
              >
                {category}
              </Text>
            );
          })}
        </ScrollView>
      )}
      <FlatList
        style={styles.container}
        data={images}
        renderItem={({ item, index }) => (
          <Pressable  style={{height:330, width:'49%', marginBottom:12}} onPress={() => navigation.navigate('wallpaperdetail',{id:item.id})} >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                height: 330,
                width: "100%",
                borderRadius: 15,
                marginBottom: 8,
                resizeMode: "cover",
              }}
            />
          </Pressable>
        )}
        keyExtractor={(item) => `${Math.random() + item.id}`}
        //initialNumToRender={3}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        onEndReached={() => {
          id ? fetchWalls(id.toString()) : fetchWalls();
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Loading />}
      ></FlatList>
    </View>
  );
}

function Loading() {
  return <ActivityIndicator size="large" color="blue" />;
}
function SkeletonLoad() {
  return <View style={styles.skeleton}></View>;
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    marginVertical: 10,
    paddingHorizontal: 8,
    height: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  skeleton: {
    backgroundColor: "lightgrey",
    height: 330,
    width: "48%",
    marginVertical: 15,

    borderRadius: 5,
  },
  categories: {
    gap: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  category: {
    marginRight: 10,
    textTransform: "capitalize",
    fontSize: 16,

    paddingHorizontal: 5,
    paddingVertical: 8,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  active: {
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 20,

    borderRadius: 5,
  },
});

// const RenderItem = React.memo((props) => (
//   <Image
//     source={{ uri: props.imageUrl }}
//     style={{
//       height: 330,
//       width: "49%",
//       borderRadius: 15,
//       marginBottom: 15,
//       resizeMode: "cover",
//     }}
//   />
// ));
// function RenderItem({
//   imageUrl,
//   identifier,
// }: {
//   imageUrl: string;
//   identifier: string;
// }) {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   console.log(imageUrl, identifier);

//   const onImageLoad = () => {
//     console.log("loadin");
//     setImageLoaded(true);
//   };

//   console.log(imageLoaded);
//   if (imageUrl) {
//     return (
//       <>
//         {!imageLoaded && <SkeletonLoad />}

//         <Image
//           key={`${identifier}-${imageUrl}`} // Use a combination of identifier and imageUrl for the key
//           source={{ uri: imageUrl }}
//           style={{
//             height: 330,
//             width: "48%",
//             borderRadius: 15,
//             marginBottom: 15,
//             resizeMode: "cover",
//           }}
//           onLoad={onImageLoad}
//           onError={() => console.log("error")}
//         />
//       </>
//     );
//   } else {
//     return <SkeletonLoad />;
//   }
// }
