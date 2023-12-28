import { UserInfo } from "@/interfaces/auth";
import { Room } from "@/interfaces/room";

export interface OrderDetail {
    userInfo: UserInfo,
    _id: string,
    roomId: Room,
    checkInDate: string,
    checkOutDate: string,
    peopleNum: 2,
    orderUserId: string,
    status: -1 | 0,
    createdAt: string,
    updatedAt: string
}