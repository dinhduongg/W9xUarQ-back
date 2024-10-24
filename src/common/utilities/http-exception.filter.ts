import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = 400

    switch (exception.getStatus()) {
      case 400:
        status = 400
        break
      case 401:
        status = 401
        break
      case 403:
        status = 403
        break
      case 422:
        status = 422
        break
      default:
        status = 400
        break
    }

    const message = status === 422 ? (exception.response.message ? exception.response.message : exception.response) : exception.message

    response.status(status).json({
      status: status,
      endPoint: request.url,
      error: message,
    })
  }
}
