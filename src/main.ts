import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { LoggingInterceptor } from './interceptors/logging.interceptors'
import { ErrorsInterceptor } from './interceptors/errors.interceptors'
//import { TransformInterceptor } from './interceptors/transform.interceptors'
const port = process.env.PORT || 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingInterceptor())
  //app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalInterceptors(new ErrorsInterceptor())
  dotenv.config()
  // Log the NODE_ENV value
  Logger.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`)
  await app.listen(port)
}
bootstrap()
