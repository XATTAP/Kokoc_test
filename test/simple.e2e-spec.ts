import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

let app: INestApplication;
beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const globalPipesOptions: ValidationPipeOptions = {
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const formattedErrors = validationErrors.map((error) => ({
        [error.property]: error.constraints,
      }));
      return new BadRequestException(formattedErrors);
    },
  };

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe(globalPipesOptions));
  await app.init();
});

describe('Simple Controller (e2e)', () => {
  // ====================================
  describe('(GET) /simples - get list Simples', () => {
    // ====================================

    it('HTTP 200 - OK', async () => {
      const result = await request(app.getHttpServer())
        .get('/simples')
        .expect(200);
      expect(result.body.total).toBeDefined();
      expect(result.body.data?.length).toBeGreaterThanOrEqual(0);
    });

    // ====================================

    it('HTTP 200 - OK with pagination', async () => {
      const page = 1;
      const limit = 50;

      const result = await request(app.getHttpServer())
        .get('/simples')
        .query({ page, limit })
        .expect(200);
      expect(result.body.total).toBeDefined();
      expect(result.body.page).toBeDefined();
      expect(result.body.limit).toBeDefined();
      expect(result.body.data?.length).toBeGreaterThanOrEqual(0);
    });

    // ====================================

    it('HTTP 400 - Validation Error', async () => {
      const page = 'error';
      const limit = 50;

      const result = await request(app.getHttpServer())
        .get('/simples')
        .query({ page, limit })
        .expect(400);
    });
  });

  // ====================================

  describe('(POST) /simples - create new Simple', () => {
    // ====================================

    it('HTTP 200 - OK', async () => {
      const body = { title: 'qw' };

      const result = await request(app.getHttpServer())
        .post('/simples')
        .send(body)
        .expect(201);
    });

    // ====================================

    it('HTTP 400 - Validation Error', async () => {
      const body = {};

      const result = await request(app.getHttpServer())
        .post('/simples')
        .send(body)
        .expect(400);
    });
  });
});
