import { Column } from 'typeorm';
import { CreateOrderItemDto } from '../dto/create-order.dto';
import { OrderStatus } from '../enum/order-status.enum';
import { OrderItem } from './order-item.entity';
import { Product } from './product.entity';

export class Order {
  id: string;
  customerName: string;
  price: number;
  orderItems: OrderItem[];
  status: OrderStatus;

  constructor(id: string, customerName: string, orderItems?: OrderItem[]) {
    this.id = id;
    this.customerName = customerName;
    this.orderItems = orderItems;
    this.status = OrderStatus.PENDING;
  }

  @Column({ nullable: true })
  paidAt: Date | null;

  @Column({ nullable: true })
  shippingAddress: string | null;

  @Column({ nullable: true })
  shippingAddressSetAt: Date | null;

  getOrderTotalPrice(): number {
    return this.orderItems.reduce(
      (totalPrice, orderItem) => totalPrice + +orderItem.getTotalPrice(),
      0,
    );
  }

  addOrderItem(product: Product): any {
    if (!this.orderItems) this.orderItems = [];

    const orderItem = this.orderItems.find(
      (item) => item.productId === product.id,
    );
    if (orderItem) {
      if (orderItem.quantity < 3) {
        orderItem.quantity += 1;
      }
    }

    this.orderItems.push(new OrderItem('rrr', this.id, product.id, 1));
    console.log('test: ', this.orderItems);
    const totalPrice = this.getOrderTotalPrice();
    if (totalPrice > 1000) {
      throw new Error('Order total price exceeds 1000');
    }
    if (totalPrice < 5) {
      throw new Error('Order total price is less than 5');
    }

    if (this.orderItems.length > 3) {
      throw new Error('Order cannot have more than 10 items');
    }

    return this.orderItems;
  }
  setShippingAddress(shippingAddress: string, order: Order): void {
    if (shippingAddress.length < 10) {
      throw new Error('Shipping address must be at least 10 characters long');
    }

    if (shippingAddress.length > 100) {
      throw new Error(
        'Shipping address must be less than or equal to 100 characters',
      );
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new Error('Order is cancelled');
    }
    if (order.status === OrderStatus.PAID) {
      throw new Error('Order is already paid');
    }

    this.shippingAddress = shippingAddress;
    this.shippingAddressSetAt = new Date();
    this.status = OrderStatus.SHIPPING_ADDRESS_SET;
  }

  pay(order: Order) {
    if (order.status === OrderStatus.CANCELLED) {
      throw new Error('Order is cancelled');
    }

    if (order.status === OrderStatus.SHIPPED) {
      throw new Error('Order is already shipped');
    }

    if (!order.shippingAddress) {
      throw new Error('Shipping address is not set');
    }

    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }
  cancel(order: Order) {
    if (order.status === OrderStatus.DELIVERED) {
      throw new Error('Order is already delivered');
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled');
    }

    this.status = OrderStatus.CANCELLED;
  }
}
