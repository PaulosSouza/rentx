import { createConnection, getConnectionOptions } from "typeorm";

export type Environment = "test" | "production";

export default async function getConnectionTypeOrm() {
  const environment = process.env.NODE_ENV as Environment;

  const connectionOptions = await getConnectionOptions();

  const { DATABASE_TEST_HOST, DATABASE_TEST_PORT, DATABASE_TEST_NAME } =
    process.env;

  switch (environment) {
    case "test":
      Object.assign(connectionOptions, {
        host: DATABASE_TEST_HOST,
        port: DATABASE_TEST_PORT,
        database: DATABASE_TEST_NAME,
      });
      break;

    case "production":
      Object.assign(connectionOptions, {
        logging: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      });
      break;

    default:
      Object.assign(connectionOptions, {
        migrationsRun: true,
        logging: true,
      });
      break;
  }

  const connection = await createConnection(connectionOptions);

  return connection;
}
