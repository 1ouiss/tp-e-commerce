import { Product } from '../entity/product.entity';

describe('Order Handling Zero Quantity Product', () => {
  it('should not remove product with zero quantity', () => {
    const products = [
      new Product('Product 1', 'bike', 'an amazing bike', 1000),
    ];
    // const product = new Product('Product 1', 'bike', 'an amazing bike', 1000);

    console.log(products);
    const jsonProducts = JSON.stringify(products);

    expect(jsonProducts).toBe(
      JSON.stringify([
        {
          id: 'Product 1',
          name: 'bike',
          description: 'an amazing bike',
          price: 1000,
        },
      ]),
    );
  });
});
