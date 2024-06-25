import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { ProductRepositoryInterface } from '../port/product.repository.interface';
import { OrderItem } from '../entity/order-item.entity';

export class CreateOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async createOrder(
    customerName: string,
    orderItems: OrderItem[],
  ): Promise<void> {
    const order = new Order(customerName, orderItems);
    return this.orderRepository.save(order);
  }

  async getOrder(orderId: string): Promise<Order> {
    return this.orderRepository.findById(orderId);
  }
}
