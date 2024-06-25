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
}
