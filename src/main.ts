import * as session from 'express-session';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './shared/adapters/AllExceptionsFilter';

const port = process.env.PORT || 3000;
const url = process.env.URL || 'localhost';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.setGlobalPrefix('dev');

  const http_adapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(http_adapter));


  const config = new DocumentBuilder()
    .setTitle('Fiap Pos Tech Challenge')
    .setDescription('Restaurante API')
    .setVersion('1.0')
    .setExternalDoc('OpenAPI JSON', `${url}:${port}/api-json`) // Adiciona o link do JSON
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // somewhere in your initialization file
  app.use(
    session({
      secret: 'my-secret', // TODO: change this to a random string
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(port);
}

bootstrap();
