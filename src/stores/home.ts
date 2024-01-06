import { defineStore } from "pinia";
import {
  apiGetNews,
  apiGetSlideShow,
  apiGetCulinary,
  getRooms,
} from "@/models/api";
import { NewsItem, SlideShowItem, CulinaryItem } from "@/interfaces/home";
import { Room } from "@/interfaces/room";
import { ref } from "vue";
export const usehomeStore = defineStore("home", () => {
  const newsList = ref([] as NewsItem[]);
  const slideShowList = ref([] as SlideShowItem[]);
  const culinaryList = ref([] as CulinaryItem[]);
  const roomList = ref([] as Room[]);
  const fetchNews = async (): Promise<void> => {
    try {
      const data = await apiGetNews();
      newsList.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSlideShow = async (): Promise<void> => {
    try {
      const data = await apiGetSlideShow();
      slideShowList.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCulinary = async (): Promise<void> => {
    try {
      const data = await apiGetCulinary();
      culinaryList.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRoom = async (): Promise<void> => {
    try {
      const data = await getRooms();
      roomList.value = data;
    } catch (error) {
      console.log(error);
    }
  }
  return {
    newsList,
    fetchNews,
    fetchSlideShow,
    slideShowList,
    culinaryList,
    fetchCulinary,
    roomList,
    fetchRoom,
  };
});
