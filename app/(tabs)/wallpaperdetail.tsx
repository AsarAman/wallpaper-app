import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import RNFetchBlob from "rn-fetch-blob";
import { downloadImage } from "@/utils";
import WallPaperManager from "@ajaybhatia/react-native-wallpaper-manager";
import ManageWallpaper, { TYPE } from "react-native-manage-wallpaper";

//import { CameraRoll } from "@react-native-camera-roll/camera-roll";

import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const wallpaperdetail = () => {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState<string>();
  const [photo, setPhoto] = useState<string>();
  const [profile, setProfile] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string>();

  const navigation = useNavigation();

  const callback = (res: any) => {
    console.log("Response: ", res);
  };
  const set = () => {
    ManageWallpaper.setWallpaper(
      {
        uri: photo,
      },
      callback,
      TYPE.HOME
    );
  };

  const requestCameraPermission = async () => {
    console.log("permissions");
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA_ROLL,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        FileSystem.downloadAsync(
          downloadUrl!,
          FileSystem.documentDirectory! + downloadUrl + ".jpg"
        ).then(({ uri }) => {
          //CameraRoll.saveToCameraRoll(uri);
          console.log("saved");
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getPhoto = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=iFrpSBc6EDgRJWUcScNxaFEtetBj-Taq7YoIu-po9F8`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      const {
        user: {
          profile_image: { large },
          name,
        },
        urls: { raw },
        links: { download },
      } = data;
      setName(name);
      setPhoto(raw);
      setProfile(large);
      setDownloadUrl(download);

      console.log(data, "single");
      console.log(name, "name");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhoto();
  }, [id]);
  console.log(id, "detail");
  console.log(downloadUrl);

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  }, [navigation]);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={50} color={"black"} />
      ) : (
        <>
          <View style={{ width: "100%", height: "100%" }}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: photo }}
              cachePolicy={"memory"}
              priority={"high"}
            />
          </View>

          <View
            style={{
              backgroundColor: "black",
              width: "90%",
              height: 100,
              position: "absolute",
              bottom: 10,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 15,
            }}
          >
            <Image
              source={{ uri: profile }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
              cachePolicy={"memory"}
              priority={"high"}
            />
            <View>
              <Text style={{ color: "white", fontSize: 24 }}>{name}</Text>
              <View style={{ flexDirection: "row", gap: 25, marginTop: 8 }}>
                <MaterialIcons
                  onPress={requestCameraPermission}
                  name="download"
                  size={24}
                  color="white"
                />
                <FontAwesome6 name="heart" size={24} color="white" />
                <Feather onPress={set} name="image" size={24} color="white" />
              </View>
            </View>
          </View>

          <Ionicons
            style={{ position: "absolute", top: 50, left: 10 }}
            name="arrow-back"
            size={32}
            color="white"
          />
        </>
      )}
    </View>
  );
};

export default wallpaperdetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
