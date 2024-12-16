import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'pg_db',
  entities: [__dirname + '**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '**/migrations/*{.ts,.js}'],
  synchronize:
    process.env.SYNCRONIZE_DB?.toLowerCase() === 'true' ? true : false,
  logging: process.env.LOGGING_DB?.toLowerCase() === 'true' ? true : false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
