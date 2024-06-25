import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { CancelOrderService } from './cancel-order.service';

describe('Cancel Order', () => {
  const order = new Order('Order 1', 'customer', [
    new OrderItem('Order Item 1', 'Order 1', 'Product 1', 1),
  ]);

  const mockOrderRepo: OrderRepositoryInterface = {
    findById: jest.fn().mockResolvedValue(order),
    save: jest.fn().mockResolvedValue(order),
    findAll: jest.fn().mockResolvedValue([order]),
    findByCustomerName: jest.fn().mockResolvedValue([order]),
    deleteOrder: jest.fn().mockResolvedValue(order),
  };
  const cancelOrderService = new CancelOrderService(mockOrderRepo);

  it('should setting shipping adreess', async () => {
    const result = await cancelOrderService.cancelOrderService(order);

    expect(result.status).toBe('CANCELLED');
    expect(result.shippingAddressSetAt).not.toBeNull();
  });
});
