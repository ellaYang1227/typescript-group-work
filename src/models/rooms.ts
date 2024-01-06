import { Room } from "@/interfaces/room";
import request from "@/plugins/axios";
import { swalWithButtons } from "@/utilities/sweetAlert";
import router from "@/router/index";

/**
 * 取得房型詳細資料
 * @param id 房型 id
 */
export function getRoomDetail(id: string): Promise<Room> {
  return request
    .get(`api/v1/rooms/${id}`)
    .then((res: any) => Promise.resolve(res.result))
    .catch(({ response }) => {
      console.error(response.data.message);
      swalWithButtons.fire({
        icon: "error",
        title: "錯誤訊息",
        text: "找不到該筆資料"
      }).then(result => {
        if (result) { router.push({ path: `/` }) }
      });
    });
}

export function getRooms(): Promise<Room[]> {
  return request
    .get(`api/v1/rooms`)
    .then((res: any) => Promise.resolve(res.result));
}
