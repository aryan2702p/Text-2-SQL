import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateSQL(prompt, tableName, attributes) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      
        const enhancedPrompt = `
            Convert this text to a SQL query for the table "${tableName}".
            The table has the following attributes: ${attributes}.
            Only return the SQL query, nothing else: ${prompt}
        `;

        const result = await model.generateContent(enhancedPrompt);

        
        return result.response.text().replace(/```[^\n]*\n|\n```/g, '').trim();
    } catch (error) {
        console.error("Error generating SQL query:", error); 
        throw error; 
    }
}
export async function generateNaturalLanguageQueries(tableName, attributes) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Craft the prompt to generate natural language queries
        const prompt = `
            Generate exactly 5 simple natural language queries that users might ask 
            based on the table "${tableName}" with the following attributes: ${attributes}.
            Keep the queries simple and related to basic operations like viewing data, filtering rows, or sorting.
            Only return the queries as a list, without any extra text or numbering.
        `;

        const result = await model.generateContent(prompt);

       
        const queries = result.response.text()
            .split('\n')
            .map(query => query.trim().replace(/^-/, '').trim())
            .filter(query => query.length > 0)
            .slice(0, 5); 

        return queries;
    } catch (error) {
        console.error("Error generating natural language queries:", error);
        throw error;
    }
}
