import { DuckDBInstance } from '@duckdb/node-api';

const instance = await DuckDBInstance.create('my_duckdb.db');
const db = await instance.connect();
console.log("db",db);

// await db.run(`DROP TABLE IF EXISTS attributes_table;`);
await db.run(`CREATE TABLE IF NOT EXISTS attributes_table (table_name TEXT, attributes TEXT)`);
await db.run(`CREATE TABLE IF NOT EXISTS Users (email TEXT PRIMARY KEY, name TEXT,password TEXT)`);
// await db.run(`CREATE TABLE IF NOT EXIST user_roles (email TEXT PRIMARY KEY, role TEXT)`);
// await db.run(`CREATE TABLE IF NOT EXIST user_tokens (email TEXT PRIMARY KEY, token TEXT)`);
await db.run(`CREATE TABLE IF NOT EXISTS user_tables (table_names TEXT PRIMARY KEY, user_email TEXT)`);
await db.run('INSTALL spatial;');
await db.run('LOAD spatial;')

export default db;