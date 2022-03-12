module.exports = {
  type: "postgres",
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["src/**/typeorm/entities/*.ts"],
  seeds: ["./src/shared/infra/typeorm/seed/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
};
