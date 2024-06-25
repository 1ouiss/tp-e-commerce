import { Product } from '../entity/product.entity';
import { Order } from '../entity/order.entity';
import { OrderItem } from '../entity/order-item.entity';

describe('Order Handling Zero Quantity Product', () => {
  it('should not remove product with zero quantity', () => {
    const product = new Product('Product 1', 'bike', 'an amazing bike', 1000);
    const order = new Order('Order 1', 'customer', [
      new OrderItem('Order Item 1', 'Order 1', product.id, 0),
    ]);
    const result = product.removeProductFromOrder(order);

    expect(result).toBe('peux pas looser');
  });

  it('should not remove product with zero quantity', () => {
    const product = new Product('Product 1', 'bike', 'an amazing bike', 1000);
    const order = new Order('Order 1', 'customer', [
      new OrderItem('Order Item 1', 'Order 1', 'toto', 0),
    ]);
    const result = product.removeProductFromOrder(order);

    console.log(result);

    expect(result).toBe('removed product');
  });
});
