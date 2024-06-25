import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { CreateOrderDto } from '../domain/dto/create-order.dto';
import { GetOrdersService } from '../domain/use-case/get-orders.service';
import { AddOrderItemService } from '../domain/use-case/add-order-item.service';
import { OrderItem } from '../domain/entity/order-item.entity';
import { OrderPresenter } from './order.presenter';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getOrdersService: GetOrdersService,
    private readonly addOrderItemService: AddOrderItemService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<void> {
    return this.createOrderService.createOrder(
      createOrderDto.customerName,
      createOrderDto.orderItems,
    );
  }

  @Get('/:orderId')
  async getOrder(@Param('orderId') orderId: string): Promise<OrderPresenter> {
    const order: Order = await this.getOrdersService.getOrderById(orderId);
    return new OrderPresenter(order);
  }

  @Get()
  async getOrders(): Promise<OrderPresenter[]> {
    const orders: Order[] = await this.getOrdersService.getAll();
    return orders.map((order) => new OrderPresenter(order));
  }
}
