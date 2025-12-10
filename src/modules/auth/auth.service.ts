import bcrypt from "bcryptjs"
import { pool } from "../../database/db"
import jwt from "jsonwebtoken"

const loginUserIntoDB = async(email:string, password:string)=>{
    const user = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `,[email])

        const matchPassword = await bcrypt.compare(password, user.rows[0].password)
        
        if(user.rows.length === 0){
            throw new Error("User not found")
        }

        if(!matchPassword){
            throw new Error("Invalid Credentials")
        }
         
       const jwtPayload={
        id: user.rows[0].id,
        name:user.rows[0].name,
        password:user.rows[0].password
       } 

       const secret = 'KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
       const token = jwt.sign(jwtPayload,secret,{expiresIn:'7d'})
        // delete user.rows[0].password;
        return {token, user: user.rows[0]};
}

export const authService={
    loginUserIntoDB
}