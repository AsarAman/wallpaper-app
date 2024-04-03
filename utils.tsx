import RNFetchBlob from "rn-fetch-blob";
import { PermissionsAndroid } from "react-native";





   export const downloadImage = (downloadUrl:string) => {
    console.log('downloading')
    const { config, fs } = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;
    console.log(fileDir, 'filedir')
    const date = new Date();

    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        notification: true,
        useDownloadManager: true,
        path:
          fileDir +
          "/download" +
          Math.floor(date.getDate() + date.getSeconds() / 2) +
          ".jpg",
        description: "image download",
      },
    })
      .fetch("GET", downloadUrl!, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log("The file saved to ", res.path());
      });
  };