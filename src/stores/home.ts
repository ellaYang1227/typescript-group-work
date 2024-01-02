import { defineStore } from "pinia";
import { apiGetNews } from "@/models/api";
import { NewsItem } from "@/interfaces/home";
import { ref } from "vue";
export const usehomeStore = defineStore("home", () => {
  const newsList = ref([] as NewsItem[]);
  const fetchNews = async () => {
    try {
      const data = await apiGetNews();
      newsList.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    newsList,
    fetchNews,
  };
});
