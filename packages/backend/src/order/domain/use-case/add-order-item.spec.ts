import OrderItemRepository from '../../infrastructure/order-item.repository';
import { Order } from '../entity/order.entity';
import { CreateOrderItemService } from './create-order-item.service';
import { ProductRepositoryInterface } from '../port/product.repository.interface';
import OrderRepository from '../../infrastructure/order.repository';
import { Product } from '../entity/product.entity';

describe('Add Order Item', () => {
  const order = new Order('toto', 'customer', []);
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
    order.addOrderItem(new Product('1', 'bike', 'an amazing bike', 1000));
    expect(order.orderItems).toContainEqual(orderItem);
  });
});
