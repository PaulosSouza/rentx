const defaultDir = process.env.NODE_ENV === "development" ? "src" : "dist";

const defaultFile = process.env.NODE_ENV === "development" ? "*.ts" : "*.js";

module.exports = {
  type: "postgres",
  port: 5432,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  migrations: [
    `./${defaultDir}/shared/infra/typeorm/migrations/${defaultFile}`,
  ],
  entities: [`./${defaultDir}/**/typeorm/entities/${defaultFile}`],
  seeds: [`./${defaultDir}/shared/infra/typeorm/seed/${defaultFile}`],
  cli: {
    migrationsDir: `./${defaultDir}/shared/infra/typeorm/migrations`,
  },
};
