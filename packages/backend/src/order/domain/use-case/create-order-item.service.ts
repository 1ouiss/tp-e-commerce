import { OrderItem } from '../entity/order-item.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { ProductRepositoryInterface } from '../port/product.repository.interface';
import { OrderItemRepositoryInterface } from '../port/order-item.repository.interface';

export class CreateOrderItemService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productRepository: ProductRepositoryInterface,
    private readonly orderItemRepository: OrderItemRepositoryInterface,
  ) {}

  async createOrderItem(
    orderId: string,
    productId: string,
    quantity: number,
  ): Promise<OrderItem> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const orderItem = new OrderItem(
      Math.random().toString(),
      orderId,
      productId,
      quantity,
    );
    await this.orderItemRepository.save(orderItem);
    await this.orderRepository.save(order);
    return orderItem;
  }
}
