import { Product } from '../domain/entity/product.entity';
import { ProductRepositoryInterface } from '../domain/port/product.repository.interface';

export class ProductRepository implements ProductRepositoryInterface {
  products: Product[] = [
    new Product('1', 'Product 1', 'Description 1', 100),
    new Product('2', 'Product 2', 'Description 2', 200),
    new Product('3', 'Product 3', 'Description 3', 300),
  ];

  async findById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) || null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findByName(name: string): Promise<Product[]> {
    return this.products.filter((product) => product.name === name);
  }

  async deleteProduct(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id);
  }

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }
}
