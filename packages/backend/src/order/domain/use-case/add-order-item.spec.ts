import OrderItemRepository from '../../infrastructure/order-item.repository';
import { Order } from '../entity/order.entity';
import { CreateOrderItemService } from './create-order-item.service';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { ProductRepositoryInterface } from '../port/product.repository.interface';
import { OrderItemRepositoryInterface } from '../port/order-item.repository.interface';
import OrderRepository from '../../infrastructure/order.repository';

describe('Add Order Item', () => {
  const order = new Order('customer', []);
  const orderItemRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderItemRepository;
  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepository;
  const productRepositoryMock = {
    findById() {
      return order;
    },
  } as unknown as ProductRepositoryInterface;

  it('should add order item', async () => {
    const orderItem = await new CreateOrderItemService(
      orderRepositoryMock,
      productRepositoryMock,
      orderItemRepositoryMock,
    ).createOrderItem('1', '1', 1);
    order.addOrderItem(
      orderItem.id,
      orderItem.orderId,
      orderItem.productId,
      orderItem.quantity,
    );
    expect(order.orderItems).toContainEqual(orderItem);
  });
});
