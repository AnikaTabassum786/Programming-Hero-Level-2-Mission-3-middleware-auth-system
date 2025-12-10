import { Request, Response } from "express";
import { authService } from "./auth.service";


const loginUser = async(req:Request, res:Response)=>{
   try{
      const result = await authService.loginUserIntoDB(req.body.email,req.body.password)
      return res.status(200).json({
           success:true,
           message:"User Created",
           data: result
      })
   }
   catch(error:any){
    return res.status(500).json({
        success:true,
        message:error.message
    })
   }
}

export const authController={
    loginUser
}