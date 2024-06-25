import { OrderItem } from './order-item.entity';

export class Order {
  id: string;
  customerName: string;
  price: number;
  orderItems: OrderItem[];

  constructor(customerName: string, orderItems: OrderItem[]) {
    this.id = Math.random().toString();
    this.customerName = customerName;
    this.orderItems = orderItems;
  }

  addOrderItem(
    orderItemId: string,
    orderId: string,
    productId: string,
    quantity: number,
  ) {
    this.orderItems.push(
      new OrderItem(orderItemId, orderId, productId, quantity),
    );
  }
}
