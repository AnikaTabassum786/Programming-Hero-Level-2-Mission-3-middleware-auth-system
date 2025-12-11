import {Request, Response, Router} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.const";


const router= Router();

router.post('/', userController.createUser)
router.get('/',auth(Roles.admin), userController.getAllUser)
router.get('/singleuser',auth(Roles.user), userController.getSingleUser)

export const userRoute =router