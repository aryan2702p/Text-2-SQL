import  {generateSQL}  from "../helpers/generateSQL.js";
import db from '../db_config.js';
import convertBigIntToString from '../helpers/sanitizeResults.js';
import { getAttributesFromDB } from '../helpers/getAttributes.js';

export const queryFile = async (req, res) => {

    try{

        const quertText = req.body.query;
        const tableName = req.body.tableName;
        const attributes = await getAttributesFromDB(tableName);
        console.log("attributes",attributes);
        //const attributes = req.body.attributes;

        console.log("queryText",quertText);

        const sqlQuery = await generateSQL(quertText,tableName,attributes);

        console.log("sqlQuery",sqlQuery);
        const sanitizedSQLQuery = sqlQuery.replace(/;$/, '');

        const result = await db.run(    `SELECT COLUMNS(*)::VARCHAR FROM (${sanitizedSQLQuery});`);
        const rows = await result.getRows();
        const colsNames = await result.columnNames();
       //console.log("rows",rows);
      
        const sanitizedChunk = await convertBigIntToString(rows);
    
        res.status(200).json({ rows: sanitizedChunk, colsNames, sqlQuery: sqlQuery });



    }catch(error){
        console.log("error in while querying",error);
        res.status(500).json({ error: error.message });
    }
}
