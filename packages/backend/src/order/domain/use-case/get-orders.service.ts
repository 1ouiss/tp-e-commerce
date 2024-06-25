import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class GetOrdersService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async getAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(orderId: string): Promise<Order> {
    return this.orderRepository.findById(orderId);
  }
}
