import  {generateSQL}  from "../helpers/generateSQL.js";
import db from '../db_config.js';
import convertBigIntToString from '../helpers/sanitizeResults.js';
import { getAttributesFromDB } from '../helpers/getAttributes.js';
import { checkQuery } from '../helpers/validateQuery.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

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
};





export const runQuery = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        const isValidQuery = checkQuery(query); // Ensure this function is properly implemented
        if (!isValidQuery) {
            return res.status(400).json({ error: "Invalid Query" });
        }

        // Define __dirname manually
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Generate file path
        const tableName = "your_table_name"; // Replace with your table name or logic to get it
        const dirPath = path.join(__dirname, `files/${tableName}`);
        const filePath = path.join(dirPath, `${Date.now()}.csv`);

        // Ensure the directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Run the query and export results to a file
        await db.run(`COPY (${query}) TO '${filePath}' (HEADER, DELIMITER ',');`);

        // Check file existence and initiate download
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(500).json({ error: "File not created" });
            } else {
                res.download(filePath, (err) => {
                    if (err) {
                        res.status(500).json({ error: "Error downloading file" });
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
