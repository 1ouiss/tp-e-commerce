import { Order } from './order.entity';

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;

  constructor(id: string, name: string, description: string, price: number) {
    console.log(
      `Creating product with id: ${id}, name: ${name}, description: ${description}, price: ${price}`,
    );

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  // addOrder(order: Order) {
  //   order.addOrderItem({
  //     productId: this.id,
  //     quantity: 1,
  //     price: this.price,
  //   });
  // }

  removeProductFromOrder(order: Order) {
    const orderItem = order.orderItems.find(
      (item) => item.orderId === order.id && item.productId === this.id,
    );

    if (orderItem) {
      return 'peux pas looser';
    }

    return this.removeProduct();
  }

  removeProduct() {
    return 'removed product';
  }
}
