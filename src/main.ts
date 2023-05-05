import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const APP_PORT = parseInt(process.env.APP_PORT || '3000');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(APP_PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${APP_PORT}/graphql`);
  });
}
bootstrap();
