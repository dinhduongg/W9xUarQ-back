import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Scope } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { AdminZodValidationPipe } from '../pipes/admin-zod-validator.pipe'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

@Injectable({ scope: Scope.REQUEST })
export class ZodValidationInterceptor implements NestInterceptor {
  constructor(private readonly schema: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    const originalUrl = request.originalUrl

    if (originalUrl.startsWith('/v1/admin')) {
      const pipe = new AdminZodValidationPipe(this.schema)
      const transformedBody = pipe.transform(request.body, { type: 'body' })
      request.body = transformedBody
    } else {
      const pipe = new ZodValidationPipe(this.schema, request)
      const transformedBody = pipe.transform(request.body, { type: 'body' })
      request.body = transformedBody
    }

    return next.handle()
  }
}
