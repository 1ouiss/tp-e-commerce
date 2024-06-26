import { OrderItem } from '../domain/entity/order-item.entity';
import { Order } from '../domain/entity/order.entity';
import { OrderStatus } from '../domain/enum/order-status.enum';

export class OrderPresenter {
  createdAt: Date;

  id: string;

  price: number;

  customerName: string;

  orderItems: OrderItem[];

  shippingAddress: string | null;

  invoiceAddress: string | null;

  shippingAddressSetAt: Date | null;

  status: OrderStatus;

  paidAt: Date | null;

  constructor(order: Order) {
    this.id = order.id;
    this.price = order.price;
    this.customerName = order.customerName;
    this.orderItems = order.orderItems;
  }
}
