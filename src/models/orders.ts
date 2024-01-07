import { Order, OrderDetail } from "@/interfaces/order";
import request from "@/plugins/axios";
import router from "@/router/index";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { swalWithButtons } from "@/utilities/sweetAlert";

const authStore = useAuthStore();
const { userInformation } = storeToRefs(authStore);

/**
 * 新增訂單
 * @param body 新增訂單內容
 */
export function addOrder(body: Order): Promise<boolean> {
  return request
    .post(`api/v1/orders/`, { ...body }, { headers: { noShowLoading: true } })
    .then(({ result, status }: any) => {
      router.push(`/rooms/${result._id}/success`);
      return Promise.resolve(status);
    });
}

/**
 * 取得訂單詳細資料
 * @param id 訂單 id
 */
export function getOrderDetail(id: string): Promise<OrderDetail> {
  return request.get(`api/v1/orders/${id}`).then(({ result }: any) => {
    const { orderUserId, status } = result;
    if (orderUserId !== userInformation.value?._id || status === -1) {
      const text =
        orderUserId !== userInformation.value?._id
          ? "這不是您的訂單，您沒有權限查詢"
          : "無法查詢已取消的訂單";

      swalWithButtons
        .fire({
          icon: "error",
          title: "錯誤訊息",
          text,
        })
        .then((res) => {
          if (res) {
            router.push(`/`);
          }
        });

      return;
    }

    return Promise.resolve(result);
  });
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
