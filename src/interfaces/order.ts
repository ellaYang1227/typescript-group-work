import { UserInfo } from "@/interfaces/auth";
import { Room } from "@/interfaces/room";

export interface BasicOrder {
  checkInDate: Date | string;
  checkOutDate: Date | string;
  peopleNum: number;
  userInfo: UserInfo;
}

export interface Order extends BasicOrder {
  roomId: Room['_id'];
}

export interface OrderDetail extends BasicOrder {
  _id: string;
  roomId: Room;
  orderUserId: string;
  status: -1 | 0;
  createdAt: Date;
  updatedAt: Date;
}
