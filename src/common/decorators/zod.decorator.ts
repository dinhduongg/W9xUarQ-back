import { UseInterceptors } from '@nestjs/common/decorators'
import { ZodValidationInterceptor } from '../interceptors/zod-validation.interceptor'

export function UseZodValidation(schema: any) {
  return UseInterceptors(new ZodValidationInterceptor(schema))
}
