import path from "path";
import { fileURLToPath } from "url";
import db from "../db_config.js";
import { getAttributes } from "../helpers/getAttributes.js";
import { normalizeAndCreateTable } from "../helpers/normalize.js";
import fs from "fs";
import { generateNaturalLanguageQueries } from "../helpers/generateSQL.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res) => {
  //console.log("API hit for file upload", req.file);

  try {
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const tableName = fileName
      .split(".")
      .slice(0, -1)
      .join("_")
      .replace(/[^a-zA-Z0-9_]/g, ""); 
    const filePath = path.resolve(req.file.path).replace(/\\/g, "/");

   // console.log("File Path:", filePath);

    await db.run(`DROP TABLE IF EXISTS ${tableName};`); // Drop table if it already exists

    if (fileType === "text/csv") {
      await db.run(
        `CREATE TABLE ${tableName} AS SELECT * FROM read_csv('${filePath}', header=true, normalize_names= true);`
      );

      
    } else {
      await normalizeAndCreateTable(filePath, tableName, fileType);
    }
    console.log("req.user : ", req.user);
    await db.run(`INSERT INTO user_tables VALUES ('${tableName}','${req.user.email}');`);

    const describe = await db.run(`DESCRIBE TABLE ${tableName};`);
    const row = await describe.getRows();
    const cols = await describe.columnNames();

    const descObj = {
      row: row,
      cols: cols,
    };

    // Get the attributes of the table
    const attributes = await getAttributes(tableName);
    await fs.promises.unlink(filePath);

    // Generate natural language queries based on the table attributes

    const naturalLanguageQueries = await generateNaturalLanguageQueries(tableName, attributes);


    res.status(200).json({
      descObj,
      naturalLanguageQueries,
      tableName,
      message: "File uploaded and table created successfully.",
    });
  } catch (error) {
    console.error("Error creating table:", error); // Log error details for debugging
    res.status(500).json({ error: error.message });
  }
};





