import { OrderDetail } from "@/interfaces/orderDetail";
import request from "@/plugins/axios";

/**
 * 取得訂單詳細資料
 * @param id 訂單 id
 */
export function getOrderDetail(id: string): Promise<OrderDetail> {
  return request
    .get(`api/v1/orders/${id}`)
    .then((res: any) => Promise.resolve(res.result));
}
