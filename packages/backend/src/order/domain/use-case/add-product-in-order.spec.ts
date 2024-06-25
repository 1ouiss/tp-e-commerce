import { Order } from '../entity/order.entity';
import { Product } from '../entity/product.entity';
import { AddOrderItemService } from './add-product-in-order.service';
import { ProductRepository } from 'src/order/infrastructure/product.repository';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { OrderItem } from '../entity/order-item.entity';

describe('Add product to an order', () => {
  it('Add product to an order', async () => {
    const order = new Order('Order 1', 'toto');
    const product = new Product('Product 1', 'bike', 'an amazing bike', 1000);

    const mockOrderRepo: OrderRepositoryInterface = {
      findById: jest.fn().mockResolvedValue(order),
      save: jest.fn().mockResolvedValue(order),
      findAll: jest.fn().mockResolvedValue([order]),
      findByCustomerName: jest.fn().mockResolvedValue([order]),
      deleteOrder: jest.fn().mockResolvedValue(order),
    };

    const mockProductRepo: ProductRepository = {
      products: [product],
      findById: jest.fn().mockResolvedValue(product),
      findAll: jest.fn().mockResolvedValue([product]),
      findByName: jest.fn().mockResolvedValue([product]),
      deleteProduct: jest.fn().mockResolvedValue(product),
      save: jest.fn().mockResolvedValue(product),
    };

    const addOrderItemService = new AddOrderItemService(
      mockOrderRepo,
      mockProductRepo,
    );

    const result = await addOrderItemService.addProductInOrder(
      'Order Item 1',
      order,
      product,
      1,
    );

    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        id: 'rrr',
        orderId: 'Order 1',
        productId: 'Product 1',
        quantity: 1,
      }),
    );
  });
});
