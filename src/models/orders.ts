import { OrderDetail } from "@/interface/orderDetail";
import request from "@/plugins/axios";

// 取得訂單詳細資料
export function getOrderDetail(id: string): OrderDetail {
    return request({
        url: `orders/${id}`,
        method: "get"
    }).then((res: any) => Promise.resolve(res.data.result));
}
