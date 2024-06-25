import { Order } from '../entity/order.entity';

export interface OrderRepositoryInterface {
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findByCustomerName(customerName: string): Promise<Order[]>;
  deleteOrder(id: string): Promise<void>;
  save(order: Order): Promise<void>;
}
