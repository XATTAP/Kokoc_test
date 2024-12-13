import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '#/src/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(configuration().port ?? 3000);
  const url = await app.getUrl();
  console.log(`server start on ${url}`);
}
bootstrap();
