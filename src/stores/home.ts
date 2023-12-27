import { defineStore } from "pinia";
import { apiGetNews } from "@/models/api";
import { ref } from "vue";
export const usehomeStore = defineStore("home", () => {
  const newsList = ref([]);
  const fetchNews = async () => {
    try {
      const {
        data: { result },
      } = await apiGetNews();
      newsList.value = result;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    newsList,
    fetchNews,
  };
});
