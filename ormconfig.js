const defaultDir = process.env.NODE_ENV === "development" ? "src" : "dir";

module.exports = {
  type: "postgres",
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  migrations: [`./${defaultDir}/shared/infra/typeorm/migrations/*.ts`],
  entities: [`./${defaultDir}/**/typeorm/entities/*.ts`],
  seeds: [`./${defaultDir}/shared/infra/typeorm/seed/*.ts`],
  cli: {
    migrationsDir: `./${defaultDir}/shared/infra/typeorm/migrations`,
  },
};
