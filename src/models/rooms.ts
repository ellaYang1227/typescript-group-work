import request from "@/plugins/axios";
import { Room } from "@/interfaces/room";

/**
 * 取得房型詳細資料
 * @param id 訂單 id
 */
export function getRoomDetail(id: string): Promise<Room> {
  return request
    .get(`api/v1/rooms/${id}`, { headers: { noShowLoading: false } })
    .then((res: any) => Promise.resolve(res.result));
}
