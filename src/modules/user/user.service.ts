import bcrypt from "bcryptjs";
import { pool } from "../../database/db";


const createUserIntoDB = async (payload: Record<string, unknown>) => {
    const { name, email, password } = payload;

    const hashPassword = await bcrypt.hash(password as string, 12)
    const result = await pool.query(`
        INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *
        `, [name, email, hashPassword])

    // delete result.rows[0].password
    return result;
}

export const userService = {
    createUserIntoDB
}