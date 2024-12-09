import 'reflect-metadata'

import { VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NextFunction, Request, Response } from 'express'

import { AppModule } from './app.module'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { HttpExceptionFilter } from './common/utilities/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // config env
  const configService = app.get(ConfigService)
  const port = configService.get('port')

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
  })

  app.enableCors()

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Api document')
    .setDescription('The API description')
    .addServer(`http://localhost:${port}`)
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'JWT', description: 'Enter JWT token', in: 'header' }, 'JWT-auth')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/document', app, document, { customSiteTitle: 'API Docs', customCss: '.models { display: none !important; }' })

  await app.listen(port)
}
bootstrap()
