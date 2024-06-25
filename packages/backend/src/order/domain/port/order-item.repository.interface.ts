import { OrderItem } from '../entity/order-item.entity';

export interface OrderItemRepositoryInterface {
  save(orderItem: OrderItem): Promise<void>;
  findById(id: string): Promise<OrderItem | null>;
  findAll(): Promise<OrderItem[]>;
  findByOrderId(orderId: string): Promise<OrderItem[]>;
  deleteOrderItem(id: string): Promise<void>;
}
