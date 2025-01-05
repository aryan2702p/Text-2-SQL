import db from "../db_config.js";

export async function getAttributes(tableName) {

    try {
        const result = await db.run(`SELECT * FROM ${tableName} LIMIT 1`);
        const colsNames = await result.columnNames();

        let attributesString = colsNames.join(",");
        console.log("attributesSTring", attributesString);
       

        console.log("Inserting attributes into attributes_table");


          await db.run(`INSERT INTO attributes_table (table_name, attributes) VALUES ('${tableName}', '${attributesString}')` );

        return colsNames;
    } catch (error) {
        console.error("Error getting attributes:", error); // Log error details for debugging
        return [];
    }

};


export async function getAttributesFromDB(tableName) {
    try {
        const result = await db.run(`SELECT attributes FROM attributes_table WHERE table_name='${tableName}'`);
        const attributes = await result.getRows();
        console.log("attributes",attributes);
        return attributes[0];
       
    } catch (error) {
        console.error("Error getting attributes:", error); // Log error details for debugging
        return [];
    }
};






