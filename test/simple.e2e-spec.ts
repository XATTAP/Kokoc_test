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
import { randomUUID } from 'crypto';

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

  describe('(GET) /simples/:id - get Simple by id', () => {

    // ====================================

    it('HTTP 200 - OK', async () => {
      const body = { title: 'test' };

      const id = (await request(app.getHttpServer())
        .post('/simples')
        .send(body)
        .expect(201)).body.raw[0]?.id

      expect(id).toBeDefined()
      
      const result = await request(app.getHttpServer())
        .get('/simples/' + id)
        .expect(200);
      expect(result.body.id).toBeDefined()
    })

    // ====================================

    it('HTTP 404 - Not Found', async () => {
      const id = randomUUID()

      await request(app.getHttpServer())
        .delete('/simples/' + id)
      
      const result = await request(app.getHttpServer())
        .get('/simples/' + id)
        .expect(404);
    })
    
  })

  // ====================================

  describe('(POST) /simples - create new Simple', () => {
    // ====================================

    it('HTTP 200 - OK', async () => {
      const body = { title: 'test' };

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

  // ====================================

  describe('(PATCH) /simples/:id - update Simple', () => {
    // ====================================
    it('HTTP 200 - OK', async () => {
      const body = { title: 'new title' };

      const id = (await request(app.getHttpServer())
        .post('/simples')
        .send(body)
        .expect(201)).body.raw[0]?.id

      expect(id).toBeDefined()

      const result = await request(app.getHttpServer())
      .patch('/simples/' + id)
      .send(body)
      .expect(200)
    })
  })

  // ====================================

  describe('(DELETE) /simples/:id - delete Simple', () => {
    it('HTTP 200 - OK', async () => {
      const body = { title: 'new title' };

      const id = (await request(app.getHttpServer())
      .post('/simples')
      .send(body)
      .expect(201)).body.raw[0]?.id

      expect(id).toBeDefined()

      const result = await request(app.getHttpServer())
      .delete('/simples/' + id)
      .expect(200)
    }, 10000*10000)
  })
});
