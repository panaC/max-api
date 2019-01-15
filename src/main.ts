import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('Cities API')
    .setDescription('A simple API using Nest')
    .setVersion('1.0')
    .addTag('cities')
    .addBearerAuth('Authorization', 'header')
    .build();
    // .setBasePath(basePath)
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();
