import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../src/order/domain/entity/order.entity';

// Pour run le test : npm run test:e2e get-orders

describe('Get Orders (e2e)', () => {
  let app: INestApplication;
  let order1: Order;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([Order])],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    orderRepository = moduleFixture.get('OrderRepository');
    order1 = new Order('John Doe', []);
    await orderRepository.save(order1);
  });
  it('should return all', async () => {
    const responseGetOrders = await request(app.getHttpServer()).get('/orders');

    expect(responseGetOrders.status).toBe(200);

    const order = responseGetOrders.body.find((orderInResponse) => {
      return orderInResponse.id === order1.id;
    });

    expect(order).toBeDefined();

    expect(order.customerName).toBe('John Doe');
  });
});
