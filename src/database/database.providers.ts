import { DataSource } from 'typeorm';
import configuration from '#/src/config/configuration';

export const databaseProviders = {
  development: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const pg_config = configuration().pg_database;
          const dataSource = new DataSource({
            type: 'postgres',
            host: pg_config.host,
            port: pg_config.port,
            username: pg_config.username,
            password: pg_config.password,
            database: pg_config.database_name,
            entities: [__dirname + '/entities/*.entity{.ts,.js}'],
            synchronize: true,
          });
          await dataSource.initialize();
          console.log(
            `Database connected successfully on port ${dataSource.options['port']}`,
          );
          return dataSource;
        } catch (error) {
          console.log(`Error connecting to database\ncode: ${error.code}`);
          throw error;
        }
      },
    },
  ],
  test: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const pg_config = configuration().pg_database;
          const dataSource = new DataSource({
            type: 'postgres',
            host: pg_config.host,
            port: pg_config.port,
            username: pg_config.username,
            password: pg_config.password,
            database: pg_config.database_name,
            entities: [__dirname + '/entities/*.entity{.ts,.js}'],
            synchronize: true,
          });
          await dataSource.initialize();
          console.log(
            `Test database connected successfully on port ${dataSource.options['port']}`,
          );
          return dataSource;
        } catch (error) {
          console.log(`Error connecting to test database\ncode: ${error.code}`);
          throw error;
        }
      },
    },
  ],
};
