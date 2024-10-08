import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    UsersModule,
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available across the application
      envFilePath: '.env', // Specify the path to your .env file
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs_db'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
