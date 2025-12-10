import express, { Request, Response } from "express"
import { initDB } from "./database/db";
import { userRoute } from "./modules/user/user.route";
import { authRoute } from "./modules/auth/auth.route";

const app = express();
app.use(express.json()); //middle ware

initDB()


// http://localhost:5000/api/v1/users
app.use('/api/v1/users', userRoute )

// http://localhost:5000/api/v1/auth
app.use('/api/v1/auth', authRoute )

app.get('/', (req: Request, res: Response) => {
    res.status(200).json(
        {
            message: "This is the root route",
            path: req.path
        }
    )
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})