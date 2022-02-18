import { createConnection, getConnectionOptions } from "typeorm";

export default async function getConnectionTypeOrm(host = "postgres_database") {
  const connectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    host,
    database:
      process.env.NODE_ENV === "test"
        ? "rentx_test"
        : connectionOptions.database,
  });

  return createConnection(connectionOptions);
}
