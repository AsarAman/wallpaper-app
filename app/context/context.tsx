import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { ParamListBase } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
//navigation error fix
declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamListBase {}
  }
}
type Image = {
  id: string;
  imageUrl: string;
};
type Category = {
  cover_photo: any;
  id: string;
  title: string;
  slug: string;
  coverPhoto: string;
};

type DataType = {
  //functions
  resetImages: () => void;
  fetchWalls: (id?: string) => void;
  setCategoriesOf: (text: string) => void;
  fetchCategories: () => void;
  setCategories: (text: string) => void;

  //state
  categories: string;
  images: Image[];
  category: Category[];
};
const AppContext = createContext<DataType>({
  resetImages: () => {},
  fetchCategories: () => {},
  setCategoriesOf: (text: string) => {},
  setCategories: (text: string) => {},
  fetchWalls: (id?: string) => {},

  categories: "all",
  images: [],
  category: [],
});

const AppProvider = ({ children }: PropsWithChildren) => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<Category[]>([]);
  const [categories, setCategories] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryPage, setCategoryPage] = useState<number>(1);

  const resetImages = () => {
    setImages([]);
  };

  const fetchWalls = async (id?: string) => {
    let url = `https://api.unsplash.com/search/photos?client_id=iFrpSBc6EDgRJWUcScNxaFEtetBj-Taq7YoIu-po9F8&query=${categories}&color=black&page=${page}`;
    if (id) {
      url = `https://api.unsplash.com/topics/${id}/photos?client_id=iFrpSBc6EDgRJWUcScNxaFEtetBj-Taq7YoIu-po9F8&page=${page}`;
    }
    if (loading || page === -1) {
      return; // Don't fetch more if already loading or no more pages
    }

    setLoading(true);
    try {
      const response = await fetch(
        url,

        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data, "hello");
      if (!data) {
        console.log("please try later");
      }

      if (data.length === 0) {
        // No more images to fetch
        setPage(-1);
        return;
      }

      const extractedImages = id
        ? data.map((item: { id: string; urls: { regular: string } }) => ({
            id: item.id,
            imageUrl: item.urls.regular,
          }))
        : data.results.map(
            (item: { id: string; urls: { regular: string } }) => ({
              id: item.id,
              imageUrl: item.urls.regular,
            })
          );
      // console.log(extractedImages, "extract");
      //setImages(extractedImages)
      setImages((prevImages) => [...prevImages, ...extractedImages]);

      // Update page number
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setImages([]);

    setPage(1); // Reset page to 1 when categories change
  }, [categories]);

  useEffect(() => {
    //console.log("Fetching wallpapers. Page:", page, "Categories:", categories);
    fetchWalls();
  }, [page, categories]);

  //fetch-categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/topics?client_id=iFrpSBc6EDgRJWUcScNxaFEtetBj-Taq7YoIu-po9F8&per_page=30`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const extractedCategories = data.map((item: Category) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        coverPhoto: item.cover_photo.urls.regular,
      }));

      setCategory((prev) => [...prev, ...extractedCategories]);

      // console.log(extractedCategories, "data");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categoryPage);
  useEffect(() => {

    fetchCategories();
  }, []);

  const setCategoriesOf = (text: string) => {
    setCategories(text);
  };

  return (
    <AppContext.Provider
      value={{
        images,
        fetchWalls,
        category,
        categories,
        setCategories,
        setCategoriesOf,
        resetImages,
        fetchCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useData = () => useContext(AppContext);

export default AppProvider;
