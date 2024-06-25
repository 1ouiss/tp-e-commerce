import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderRepository from './infrastructure/order.repository';
import OrderController from './presentation/order.controller';
import { CreateOrderService } from './domain/use-case/create-order.service';
import { OrderRepositoryInterface } from './domain/port/order.repository.interface';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { GetOrdersService } from './domain/use-case/get-orders.service';
import { AddOrderItemService } from './domain/use-case/add-order-item.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductRepository } from './infrastructure/product.repository';
// import { OrderListener } from './infrastructure/event/order.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: 'OrderItemRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository,
    },
    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface', EventEmitter2],
    },

    {
      provide: GetOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    // OrderListener,
    {
      provide: AddOrderItemService,
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        productRepository: ProductRepository,
      ) => {
        return new AddOrderItemService(orderRepository, productRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export class OrderModule {}
