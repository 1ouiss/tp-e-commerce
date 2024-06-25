import { Product } from '../entity/product.entity';

export interface ProductRepositoryInterface {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  save(product: Product): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}
