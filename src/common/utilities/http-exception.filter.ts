import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus ? (exception.getStatus() === 422 ? 422 : exception.getStatus()) : 400
    const message = status === 422 ? (exception.response.message ? exception.response.message : exception.response) : exception.message

    response.status(status).json({
      status: status,
      endPoint: request.url,
      error: message,
    })
  }
}
