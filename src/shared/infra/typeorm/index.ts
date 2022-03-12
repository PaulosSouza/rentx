import { createConnection, getConnectionOptions } from "typeorm";

export default async function getConnectionTypeOrm(
  host = process.env.DATABASE_HOST
) {
  const connectionOptions = await getConnectionOptions();

  const hostMapped = process.env.NODE_ENV === "test" ? "localhost" : host;

  Object.assign(connectionOptions, {
    host: hostMapped,
    database:
      process.env.NODE_ENV === "test"
        ? "rentx_test"
        : connectionOptions.database,
  });

  const environment = process.env.NODE_ENV;

  if (environment === "production") {
    Object.assign(connectionOptions, {
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    });
  }

  const connection = await createConnection(connectionOptions);

  if (environment === "production") connection.runMigrations();

  return connection;
}
