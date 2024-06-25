import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class CancelOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async cancelOrderService(order: Order): Promise<Order> {
    if (!order) throw new Error('Order not found');

    order.cancel(order);
    await this.orderRepository.save(order);

    return order;
  }
}
