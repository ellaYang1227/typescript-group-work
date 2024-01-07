import { Room } from "@/interfaces/room";
import request from "@/plugins/axios";

/**
 * 取得房型詳細資料
 * @param id 房型 id
 */
export function getRoomDetail(id: string): Promise<Room> {
  return request
    .get(`api/v1/rooms/${id}`)
    .then((res: any) => Promise.resolve(res.result));
}
