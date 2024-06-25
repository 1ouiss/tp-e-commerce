import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { Product } from '../entity/product.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { PayOrderService } from './paid-order.service';
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
  const payOrderService = new PayOrderService(mockOrderRepo);

  it('should setting shipping adreess', async () => {
    const orderNew = await setOrderShippingService.setShippingAdress(
      order,
      '12 rue d12 rue d12 rue d12 egrereerttrtr d12 rue d',
    );

    const result = await payOrderService.payOrderService(orderNew);

    expect(result.status).toBe('PAID');
    expect(result.shippingAddressSetAt).not.toBeNull();
  });
});
