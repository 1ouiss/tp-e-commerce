import { OrderItem } from '../domain/entity/order-item.entity';
import { DataSource } from 'typeorm';
import { OrderItemRepositoryInterface } from '../domain/port/order-item.repository.interface';

export default class OrderItemRepository
  implements OrderItemRepositoryInterface
{
  constructor(private readonly datasource: DataSource) {}

  async findById(id: string): Promise<OrderItem | null> {
    const queryBuilder = this.datasource
      .createQueryBuilder(OrderItem, 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product');

    queryBuilder.where('orderItem.id = :id', { id });

    return queryBuilder.getOne();
  }

  async save(orderItem: OrderItem): Promise<void> {
    await this.datasource.manager.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    const queryBuilder = this.datasource
      .createQueryBuilder(OrderItem, 'orderItem')
      .orderBy('orderItem.createdAt', 'DESC');

    return queryBuilder.getMany();
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    const queryBuilder = this.datasource
      .createQueryBuilder(OrderItem, 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product');

    queryBuilder.where('orderItem.orderId = :orderId', { orderId });

    return queryBuilder.getMany();
  }

  async deleteOrderItem(id: string): Promise<void> {
    const queryBuilder = this.datasource
      .createQueryBuilder(OrderItem, 'orderItem')
      .where('orderItem.id = :id', { id });

    await queryBuilder.delete().execute();
  }
}
