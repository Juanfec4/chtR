import "dotenv/config";

import type { Knex } from "knex";

// Update with your config settings.

const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  migrations: {
    tableName: "knex_migrations",
    directory: "./src/config/knex/migrations",
  },

  seeds: {
    directory: "./src/config/knex/seeds",
  },
};

export default config;
