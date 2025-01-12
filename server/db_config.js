import { DuckDBInstance } from '@duckdb/node-api';

const instance = await DuckDBInstance.create('my_duckdb.db');
const db = await instance.connect();
console.log("db",db);

// await db.run(`DROP TABLE IF EXISTS attributes_table;`);
await db.run(`CREATE TABLE IF NOT EXISTS attributes_table (table_name VARCHAR, attributes VARCHAR)`);
await db.run(`CREATE TABLE IF NOT EXISTS Users (email VARCHAR, name VARCHAR,password VARCHAR, PRIMARY KEY(email))`);
// await db.run(`CREATE TABLE IF NOT EXIST user_roles (email TEXT PRIMARY KEY, role TEXT)`);
// await db.run(`CREATE TABLE IF NOT EXIST user_tokens (email TEXT PRIMARY KEY, token TEXT)`);
await db.run(`CREATE TABLE IF NOT EXISTS user_tables (table_names VARCHAR , user_email VARCHAR, PRIMARY KEY(table_names,user_email))`);
await db.run('INSTALL spatial;');
await db.run('LOAD spatial;')

export default db;