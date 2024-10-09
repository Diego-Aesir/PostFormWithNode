const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (255),
  password VARCHAR (255)
);`;

async function createDatabase() {
  const client = new Client({
    connectionString: "postgresql://diego:123@localhost:5432/",
  });

  await client.connect();
  try {
    await client.query("CREATE DATABASE postformwnode");
    console.log("Database created successfully!");
  } catch (err) {
    if (err.code === "42P04") {
      console.log("Database already exists, skipping creation.");
    } else {
      console.error("Error creating database", err);
    }
  } finally {
    await client.end();
  }
}

async function createTable() {
  const client = new Client({
    connectionString: "postgresql://diego:123@localhost:5432/postformwnode",
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
}

async function main() {
  try {
    await createDatabase();
    await createTable();
  } catch (err) {
    console.error("Error creating database or table", err);
  }
}

main();
