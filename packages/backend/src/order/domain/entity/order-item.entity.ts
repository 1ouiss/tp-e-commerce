import { ProductRepositoryInterface } from '../port/product.repository.interface';

export class OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;

  constructor(
    orderItemId: string,
    orderId: string,
    productId: string,
    quantity: number,
  ) {
    this.id = orderItemId;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }

  async getTotalPrice(): Promise<number> {
    return 200;
  }
}
