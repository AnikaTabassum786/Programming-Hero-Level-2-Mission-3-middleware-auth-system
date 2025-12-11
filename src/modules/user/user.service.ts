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


const getAllUserIntoDB = async () => {

    const result = await pool.query(`
        SELECT * FROM users 
        ` )
    //SELECT id,name,email FROM users 
    // delete result.rows[0].password
    return result;
}

const getSingleUserIntoDB = async (email: string) => {

    const result = await pool.query(`
    SELECT id,name,email,age,created_at,updated_at FROM users WHERE email=$1
`, [email])
    return result;
}

export const userService = {
    createUserIntoDB,
    getAllUserIntoDB,
    getSingleUserIntoDB
}