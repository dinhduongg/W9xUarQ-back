import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { HttpExceptionFilter } from './common/utilities/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // config env
  const configService = app.get(ConfigService)
  const port = configService.get('port')

  app.setGlobalPrefix('v1')
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors()

  // swagger
  const config = new DocumentBuilder()
    .setTitle('LinhkienX api document')
    .addServer(`http://localhost:${port}`)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'JWT', description: 'Enter JWT token', in: 'header' }, 'JWT-auth')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/document', app, document, { customCss: '.models { display: none !important; }' })

  await app.listen(port)
}
bootstrap()
