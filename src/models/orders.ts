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

/**
 * 取消單筆訂單
 * @param id 訂單 id
 */
export function deleteOneOrder(id: string): Promise<OrderDetail[]> {
  return request
    .delete(`api/v1/orders/${id}`)
    .then((res: any) => Promise.resolve(res.result));
}

// 取得所有訂單資料
export function getOrders(): Promise<OrderDetail[]> {
  return request
    .get(`api/v1/orders`)
    .then((res: any) => Promise.resolve(res.result));
}