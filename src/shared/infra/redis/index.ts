import { createClient } from "redis";

const { REDIS_HOST, REDIS_PORT } = process.env;

export default async function getConnectionRedis() {
  const client = createClient({
    legacyMode: true,
    socket: {
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
      sessionTimeout: 20,
    },
  });

  await client.connect();

  return client;
}
