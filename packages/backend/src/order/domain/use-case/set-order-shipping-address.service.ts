import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

export class SetShippingService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async setShippingAdress(order: Order, address: string): Promise<Order> {
    if (!order) throw new Error('Order not found');
    // if (!order.shippingAddress) throw new Error('Shipping address not set');

    order.setShippingAddress(address, order);
    await this.orderRepository.save(order);

    return order;
  }
}
