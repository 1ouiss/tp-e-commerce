import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductService } from '../domain/use-case/create-product.service';
import { CreateProductDto } from '../domain/dto/create-product.dto';
import { Product } from '../domain/entity/product.entity';

@Controller('/products')
export default class OrderController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDTO: CreateProductDto,
  ): Promise<void> {
    return this.createProductService.createProduct(createProductDTO);
  }
}
