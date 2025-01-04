import db from '../db_config.js';

export const getAttributes = async (req,res) => {
    try {
        const result = await db.run(`SELECT * FROM attributes_table `);

        const rows = await result.getRows();
        console.log("rows",rows);
        res.status(200).json({ rows });
       
    } catch (error) {
        console.error("Error getting attributes:", error); // Log error details for debugging
       res.status(500).json({ error: error.message });
    }
};