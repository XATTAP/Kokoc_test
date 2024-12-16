import { DataSource } from 'typeorm';
import { dataSourceOptions } from './dataSources/dataSource.options';

export const databaseProviders = {
  development: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource(dataSourceOptions);
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
  ]

};
