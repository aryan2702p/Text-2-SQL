import db from '../db_config.js';
import {generateNaturalLanguageQueries} from '../helpers/generateSQL.js';
import {getAttributes} from '../helpers/getAttributes.js';

// export const getAttributes = async (req,res) => {
//     try {
//         const result = await db.run(`SELECT * FROM attributes_table `);

//         const rows = await result.getRows();
//         console.log("rows",rows);
//         res.status(200).json({ rows });
       
//     } catch (error) {
//         console.error("Error getting attributes:", error); // Log error details for debugging
//        res.status(500).json({ error: error.message });
//     }
// };


export const getTableData = async (req,res) => {
    try {
        const {tableName} = req.body;
        
      console.log("fetching table data tableName",tableName);
        const describe = await db.run(`DESCRIBE TABLE ${tableName};`);
        const row = await describe.getRows();
        const cols = await describe.columnNames();
        const attributes = await getAttributes(tableName);
    
        const descObj = {
          row: row,
          cols: cols,
        };

        const naturalLanguageQueries = await generateNaturalLanguageQueries(tableName, attributes);
        console
        res.status(200).json({
            descObj,
            naturalLanguageQueries,
            tableName,
            
          });


    } catch (error) {
        console.error("Error getting table data:", error); // Log error details for debugging
       res.status(500).json({ error: error.message });
    }
}