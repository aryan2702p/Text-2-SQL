import db from '../db_config.js';
export const getTables = async (req, res) => {
  
    try{
  
      const email = req.user;
  
      const tables = await db.run(`SELECT table_names FROM user_tables WHERE user_email = '${email}';`);
      const rows = await tables.getRows();
      return res.status(200).json({ tables: rows });
  
    }catch(error){
      console.log("error in getTables",error);
      res.status(500).json({ error: error.message });
    }
  
  
  };