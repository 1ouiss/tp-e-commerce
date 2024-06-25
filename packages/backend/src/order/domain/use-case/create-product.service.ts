import { Product } from '../entity/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from '../../infrastructure/product.repository';

export class CreateProductService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    const { id, name, description, price } = createProductDto;
    const product = new Product(id, name, description, price);
    return this.productsRepository.save(product);
  }
}
