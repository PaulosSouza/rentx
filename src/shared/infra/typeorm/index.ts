import { createConnection, getConnectionOptions } from "typeorm";

export default async function getConnectionTypeOrm(host = "postgres_database") {
  const connectionOptions = await getConnectionOptions();

  const hostMapped = process.env.NODE_ENV === "test" ? "localhost" : host;

  Object.assign(connectionOptions, {
    host: hostMapped,
    database:
      process.env.NODE_ENV === "test"
        ? "rentx_test"
        : connectionOptions.database,
  });

  return createConnection(connectionOptions);
}
