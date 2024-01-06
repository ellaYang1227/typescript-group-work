import { Order, OrderDetail } from "@/interfaces/order";
import request from "@/plugins/axios";
import router from "@/router/index";

/**
 * 新增訂單
 * @param body 新增訂單內容
 */
export function addOrder(body: Order): Promise<boolean> {
  return request
    .post(`api/v1/orders/`, { ...body })
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
