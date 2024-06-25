import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class PayOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async payOrderService(order: Order): Promise<Order> {
    if (!order) throw new Error('Order not found');

    order.pay(order);
    await this.orderRepository.save(order);

    return order;
  }
}
