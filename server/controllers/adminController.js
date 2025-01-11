import db from "../db_config.js";


export const getAllTables = async (req, res) => {
    try {
        console.log("getAllTables called");
        const result = await db.run(`SELECT * FROM user_tables`);
        const rows = await result.getRows();
        const colNames = await result.columnNames();

        res.status(200).json({ rows,colNames});
    } catch (error) {
        console.log("error in getAllTables", error);
        res.status(500).json({ error: error.message });
    }
};


export const getAllUsers = async (req, res) => {   
    try {
        console.log("getAllUsers called");
        const result = await db.run(`SELECT email,name FROM users`);
        const rows = await result.getRows();
        const colNames = await result.columnNames();

        res.status(200).json({ rows,colNames});
    } catch (error) {
        console.log("error in getAllUsers", error);
        res.status(500).json({ error: error.message });
    }
} 