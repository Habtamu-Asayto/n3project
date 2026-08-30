import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { GlobalExceptionFilter } from './shared/filters';
import {
  TransformInterceptor,
  LoggingInterceptor,
} from './shared/interceptors';
import { RbacDomainService } from './domain/rbac/services';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const configService = app.get(ConfigService);

  // Configure RBAC domain service from environment (fully dynamic)
  RbacDomainService.configure({
    superAdminRole:
      configService.get<string>('SUPER_ADMIN_ROLE') || 'super_admin',
    systemRoles: (
      configService.get<string>('SYSTEM_ROLES') || 'super_admin,admin'
    )
      .split(',')
      .map((r) => r.trim()),
  });
  const port = configService.get<number>('PORT') || 4000;
  console.log("Tets === "+port);
  
  const apiPrefix = configService.get<string>('API_PREFIX') || 'api/v1';
  const frontendUrl =
    configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

  // Security
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: [frontendUrl],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Global prefix
  app.setGlobalPrefix(apiPrefix);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global filters
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('N3 Project Full Guideline API')
    .setDescription('Efficient RBAC Implementation with NestJS and TypeScript')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  Logger.log(`🚀 FMS Backend running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(
    `📚 Swagger docs at http://localhost:${port}/api/docs`,
    'Bootstrap',
  );
}

bootstrap();

