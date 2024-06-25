import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { Product } from '../entity/product.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { ProductRepositoryInterface } from '../port/product.repository.interface';

export class AddOrderItemService {
  constructor(
    private orderRepository: OrderRepositoryInterface,
    private productRepository: ProductRepositoryInterface,
  ) {}

  async addProductInOrder(
    orderItemId: string,
    order: Order,
    product: Product,
    quantity: number,
  ): Promise<void> {
    if (!order) throw new Error('Order not found');

    if (!product) throw new Error('Product not found');

    const orderItems = order.addOrderItem(product);
    // console.log(orderItems);

    return orderItems[0];

    // const orderItem = new OrderItem(orderItemId, orderId, productId, quantity);
    // order.orderItems.push(orderItem);

    // await this.orderRepository.save(order);
  }
}
