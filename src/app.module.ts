import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      driver: require('mysql2'),
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'Library',
      entities: [],
      synchronize: false,
    }),
    BooksModule,
  ],
})
export class AppModule {}
