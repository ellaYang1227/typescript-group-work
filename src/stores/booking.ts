import { defineStore } from "pinia";
import { ref } from "vue";

interface BookingData {
  startDate: Date;
  endDate: Date;
  peopleNum: number;
  id: string;
}

export const useBookingStore = defineStore("booking", () => {
  const defaultBooking = {
    startDate: new Date(),
    endDate: new Date(),
    peopleNum: 0,
    id: "",
  };
  const booking = ref<BookingData>({ ...defaultBooking });

  const setBookingData = (data: BookingData) => {
    booking.value = { ...booking.value, ...data };
  };

  const clearBookingData = () => {
    booking.value = { ...defaultBooking };
  };

  return {
    booking,
    setBookingData,
    clearBookingData,
  };
});
