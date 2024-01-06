import { defineStore } from "pinia";
import { apiGetNews, apiGetSlideShow, apiGetCulinary } from "@/models/api";
import { NewsItem, SlideShowItem, CulinaryItem } from "@/interfaces/home";
import { ref } from "vue";
export const usehomeStore = defineStore("home", () => {
  const newsList = ref([] as NewsItem[]);
  const slideShowList = ref([] as SlideShowItem[]);
  const culinaryList = ref([] as CulinaryItem[]);
  const fetchNews = async () => {
    try {
      const data = await apiGetNews();
      newsList.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSlideShow = async () => {
    try {
      const data = await apiGetSlideShow();
      slideShowList.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCulinary = async () => {
    try {
      const data = await apiGetCulinary();
      culinaryList.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    newsList,
    fetchNews,
    fetchSlideShow,
    slideShowList,
    culinaryList,
    fetchCulinary,
  };
});
