import { DuckDBInstance } from '@duckdb/node-api';

const instance = await DuckDBInstance.create('my_duckdb.db');
const db = await instance.connect();
console.log("db",db);

await db.run(`DROP TABLE IF EXISTS attributes_table;`);
await db.run(`CREATE TABLE attributes_table (table_name TEXT, attributes TEXT)`);
await db.run('INSTALL spatial;');
await db.run('LOAD spatial;')

export default db;