import { Request, Response } from "express";
import { pool } from "../../database/db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
   try{
    const result = await userService.createUserIntoDB(req.body);
    

        return res.status(201).json({
            success:true,
            message:"User Created Successfully",
            data:result.rows[0]
        })
   }
   catch(err:any){
     return res.status(500).json({
        success:false,
        message:err.message
      })
   }
}

export const userController={
    createUser,
}