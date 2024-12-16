import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '#/src/config/configuration';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.useGlobalPipes(new ValidationPipe(globalPipesOptions));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Документация OpenApi')
    .setDescription('Документация сервиса')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configuration().port ?? 3000);
  const url = await app.getUrl();
  console.log(`server start on ${url}`);
}
bootstrap();
