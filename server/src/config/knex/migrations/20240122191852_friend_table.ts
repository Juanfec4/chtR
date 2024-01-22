import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("friendships", (table) => {
    //Friendship id
    table.increments("id").notNullable().unsigned().unique().primary();

    //User 1
    table.integer("user1_id").unsigned().notNullable().references("users.id").onDelete("CASCADE");

    //User 2
    table.integer("user2_id").unsigned().notNullable().references("users.id").onDelete("CASCADE");

    //Status
    table.enum("status", ["pending", "accepted"]).defaultTo("pending");

    //Created at date
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("friendships");
}
