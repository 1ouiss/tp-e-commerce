import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { SetShippingService } from './set-order-shipping-address.service';

describe('set Shipping', () => {
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
  const setOrderShippingService = new SetShippingService(mockOrderRepo);

  it('should setting shipping adreess', async () => {
    const result = await setOrderShippingService.setShippingAdress(
      order,
      '12 rue d12 rue d12 rue d12 rue d12 rue d',
    );
    console.log(result);

    expect(result.shippingAddress).toBe(
      '12 rue d12 rue d12 rue d12 rue d12 rue d',
    );
    expect(result.shippingAddressSetAt).not.toBeNull();
  });
});
