import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import * as dotenv from 'dotenv'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  dotenv.config()
  // Log the NODE_ENV value
  Logger.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`)
  await app.listen(3000)
}
bootstrap()
