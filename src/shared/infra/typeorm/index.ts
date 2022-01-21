import { createConnection, getConnectionOptions } from "typeorm";

export default async function getConnectionTypeOrm(host = "postgres_database") {
  const connectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    host,
  });

  return createConnection(connectionOptions);
}
