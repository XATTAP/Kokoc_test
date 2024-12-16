import { config } from "dotenv"

config()

export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  pg_database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database_name: process.env.POSTGRES_DATABASE || 'pg_db',
  },
});
