import { OrderItem } from '../entity/order-item.entity';

export type CreateOrderDto = {
  id: string;
  customerName: string;
  orderId: string;
  productId: string;
  quantity: number;
  orderItems: OrderItem[];
};
