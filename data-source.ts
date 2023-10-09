import { config } from 'dotenv';
import {
  DataSource,
  DataSourceOptions,
} from 'typeorm';
import { Books } from 'src/books/book.entity';
import { UserEntity } from 'src/users/user.entity';
import { Autor } from 'src/books/author.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['dist/migrations/*.js'],
  entities: [Books, UserEntity, Autor],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
