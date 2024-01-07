import { Order, OrderDetail } from "@/interfaces/order";
import request from "@/plugins/axios";
import router from "@/router/index";

/**
 * 新增訂單
 * @param body 新增訂單內容
 */
export function addOrder(body: Order): Promise<boolean> {
  return request
    .post(`api/v1/orders/`,
      { ...body },
      { headers: { noShowLoading: true } })
    .then(({ result, status }: any) => {
      router.push({ path: `/rooms/${result._id}/success` })
      return Promise.resolve(status);
    });
}

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