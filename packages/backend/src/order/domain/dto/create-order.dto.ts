import { OrderItem } from '../entity/order-item.entity';

export type CreateOrderDto = {
  id: string;
  customerName: string;
  orderId: string;
  productId: string;
  quantity: number;
  orderItems: OrderItem[];
};

export class CreateOrderItemDto {
  productId: string;

  quantity: number;

  price: number;
}
