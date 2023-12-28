import { ApiResult } from "@/interfaces/api";
import { OrderDetail } from "@/interfaces/orderDetail";
import request from "@/plugins/axios";

// 取得訂單詳細資料
export function getOrderDetail(id: string): OrderDetail {
    return request.get(`api/v1/orders/${id}`)
        .then((res: ApiResult) => Promise.resolve(res.result));
}
