import db from '../db_config.js';

export async function normalizeAndCreateTable(filePath, tableName, fileType) {
    try {
     
      if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        //console.log("excel file in normalizing....");
        await db.run(
          `CREATE TABLE ${tableName} AS SELECT * FROM st_read('${filePath}');`
        );
      } else if (fileType === 'application/json') {
        await db.run(
          `CREATE TABLE ${tableName} AS SELECT * FROM read_json('${filePath}');`
        );
      } else if (fileType === 'application/octet-stream') {
        await db.run(
          `CREATE TABLE ${tableName} AS SELECT * FROM read_parquet('${filePath}');`
        );
       
      }else{
        throw new Error('Unsupported file type for normalization');

      }
  
      // Step 2: Retrieve column names from the temporary table
      const describeTemp = await db.run(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}';`);
      const tempColumnNames = await describeTemp.getRows();


  
      // Step 3: Normalize column names
      const normalizedColumns = tempColumnNames.map(([col]) => {
        return col
          .toLowerCase() // Convert to lowercase
          .replace(/\s+/g, '_') // Replace spaces with underscores
          .replace(/[^a-z0-9_]/g, ''); // Remove non-alphanumeric characters
      });
    
      
      // Step 4: Generate SQL for creating the final table
      for (let i = 0; i < tempColumnNames.length; i++) {
        const originalColumn = tempColumnNames[i][0];
        const normalizedColumn = normalizedColumns[i];
        if (originalColumn !== normalizedColumn) {
          const renameQuery = `ALTER TABLE ${tableName} RENAME "${originalColumn}" TO "${normalizedColumn}";`;
          await db.run(renameQuery);
        }
      }
    
    } catch (error) {
      console.error("Error normalizing column names and creating table:", error);
      // Re-throw the error for the caller to handle
    }
  }
  

