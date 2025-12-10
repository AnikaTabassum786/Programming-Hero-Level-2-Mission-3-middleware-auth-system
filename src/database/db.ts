import { Pool } from "pg"

export const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_Fb3PTV2kSvml@ep-aged-fog-ahs7paju-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

export const initDB= async()=>{
    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `
    )
    console.log("Database Connected")
}

