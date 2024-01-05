import { defineStore } from "pinia";
import { apiGetNews, apiGetSlideShow } from "@/models/api";
import { NewsItem, SlideShowItem } from "@/interfaces/home";
import { ref } from "vue";
export const usehomeStore = defineStore("home", () => {
  const newsList = ref([] as NewsItem[]);
  const slideShowList = ref([] as SlideShowItem[]);
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
  return {
    newsList,
    fetchNews,
    fetchSlideShow,
    slideShowList,
  };
});
