import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BooksModule } from './books/books.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './auth/guards/roles.guard'

@Module({
  imports: [
    UsersModule,
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available across the application
      envFilePath: '.env', // Specify the path to your .env file
    }),
    // MongooseModule.forRoot('mongodb://localhost:27017/nestjs_db'),
    // AuthModule,
    // BooksModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
    }),
    AuthModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
