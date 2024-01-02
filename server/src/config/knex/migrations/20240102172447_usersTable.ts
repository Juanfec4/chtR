import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("users", (table) => {
    //User id
    table.increments("id").notNullable().unsigned().unique().primary();

    //Username (3 - 15 size alphanumeric, - & _)
    table.string("username").notNullable().unique().checkRegex("^[a-z0-9_-]{3,15}$");

    //Display name (1 - 24 size alphabet, - & spaces)
    table.string("name").notNullable().checkRegex("^[a-zA-Z -]{1,24}$");

    //Password hash
    table.string("password").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
