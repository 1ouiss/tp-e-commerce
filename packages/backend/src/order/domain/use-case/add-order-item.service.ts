import { OrderItem } from '../entity/order-item.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { ProductRepositoryInterface } from '../port/product.repository.interface';

export class AddOrderItemService {
  constructor(
    private orderRepository: OrderRepositoryInterface,
    private productRepository: ProductRepositoryInterface,
  ) {}

  async addOrderItem(
    orderId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    order.addOrderItem(product, quantity);

    await this.orderRepository.save(order);
  }
}
