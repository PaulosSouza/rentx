import { createConnection, getConnectionOptions } from "typeorm";

export default async function getConnectionTypeOrm() {
  const environment = process.env.NODE_ENV;

  const connectionOptions = await getConnectionOptions();

  if (environment === "test") {
    const { DATABASE_TEST_HOST, DATABASE_TEST_PORT, DATABASE_TEST_NAME } =
      process.env;

    Object.assign(connectionOptions, {
      host: DATABASE_TEST_HOST,
      port: DATABASE_TEST_PORT,
      database: DATABASE_TEST_NAME,
    });
  }

  if (environment === "production") {
    Object.assign(connectionOptions, {
      migrationsRun: true,
      logger: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    });
  }

  const connection = await createConnection(connectionOptions);

  return connection;
}
