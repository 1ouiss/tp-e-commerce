import { Product } from '../entity/product.entity';

describe('Create Product', () => {
  const product = new Product('Product 1', 'bike', 'an amazing bike', 1000);

  it('should create product', () => {
    expect(product).toBeDefined();
  });
});
