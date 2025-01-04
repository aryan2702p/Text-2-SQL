import db from './db_config.js';


//const result = await db.run("SELECT name FROM sqlite_master WHERE type='table';");
const result = await db.run("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'OrdersWithNulls_temp';");


//const result = await db.run(`SELECT * FROM states_by_country WHERE State Name = "Balkn" LIMIT 5;`);
const row = await result.getRows();
const colsNames = await result.columnNames();
//console.log(colsNames);


console.log(row);

// import db from '../db_config.js';

// export async function normalizeAndCreateTable(filePath, tableName, fileType) {
//     try {
//       // Step 1: Create a temporary table based on file type
//       const tempTableName = `${tableName}_temp`;
//       if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
//         //console.log("excel file in normalizing....");
//         await db.run(
//           `CREATE TABLE ${tempTableName} AS SELECT * FROM st_read('${filePath}');`
//         );
//       } else if (fileType === 'application/json') {
//         await db.run(
//           `CREATE TABLE ${tempTableName} AS SELECT * FROM read_json('${filePath}');`
//         );
//       } else if (fileType === 'application/octet-stream') {
//         await db.run(
//           `CREATE TABLE ${tempTableName} AS SELECT * FROM read_parquet('${filePath}');`
//         );
       
//       }else{
//         throw new Error('Unsupported file type for normalization');

//       }
  
//       // Step 2: Retrieve column names from the temporary table
//       const describeTemp = await db.run(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tempTableName}';`);
//       const tempColumnNames = await describeTemp.getRows();


  
//       // Step 3: Normalize column names
//       const normalizedColumns = tempColumnNames.map(colArr => {
//         const col = colArr[0]; // Extract the string from the sub-array
//         return col
//             .toLowerCase() // Convert to lowercase
//             .replace(/\s+/g, '_') // Replace spaces with underscores
//             .replace(/[^a-z0-9_]/g, ''); // Remove non-alphanumeric characters
//     });
    
      
//       // Step 4: Generate SQL for creating the final table
//       const columnMapping = tempColumnNames
//         .map((col, idx) => `"${col}" AS "${normalizedColumns[idx]}"`)
//         .join(', ');
  
//       await db.run(
//         `CREATE TABLE ${tableName} AS SELECT ${columnMapping} FROM ${tempTableName};`
//       );


  
//       // Step 5: Drop the temporary table
//       await db.run(`DROP TABLE ${tempTableName};`);


    
//     } catch (error) {
//       console.error("Error normalizing column names and creating table:", error);
//       // Re-throw the error for the caller to handle
//     }
//   }
  

