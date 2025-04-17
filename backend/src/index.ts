declare global {
    namespace Express {
        export interface Request{
            userId?: string
        }
    }
}



import dotenv from 'dotenv';
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { ContentModel, LinkMOdel, UserModel } from './db';
import express, { Request, Response } from "express";
import { userMiddleware } from './middleware';
import { random } from './utils';
import cors from "cors"

dotenv.config()

const app = express()
app.use(express.json());

app.use(cors({ origin: '*' }));

  
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});
  

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

app.post("/api/v1/signup", async (req:Request, res:Response): Promise<any> => {
    try {
        const username = req.body.username
        const password = req.body.password
        // const { username, password } = req.body as { username: User.username; password: User.password };


        if (!username || !password){
            return res.status(400).json({message: "Username and password are required"})
        }

        await UserModel.create({
            username: username,
            password: password
        })

        res.status(200).json({
            message: "user signed up successfully"
    })
        
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
    
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const existingUser =  await UserModel.findOne({
        username: username,
        password: password
    })

    if (existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, `${process.env.JWT_PASSWORD}`)

        res.json({
             token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware,  async (req, res) => {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type
    await ContentModel.create({
        link,
        title,
        type,
        userId: req.userId,
        tags: []
    }) 

    res.json({
        message:"Content Created"
    })
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        content
    })
})

app.delete("/api/v1/content/:contentId", userMiddleware, async (req, res) => {
    const contentId = req.params.contentId

    await ContentModel.deleteMany({
        _id:contentId,
        userId: req.userId 
    })

    res.json({
        message: "Deleted successfully"
    })
})


app.post("/api/v1/brian/share", userMiddleware, async (req, res) => {
    const {share} = req.body 
    if (share){
        const existingLink = await LinkMOdel.findOne({
            userId: req.userId
        })

        if (existingLink){
            res.json({
                hash: existingLink.hash
            })
            return
        }
        const hash = random(11)
        await LinkMOdel.create({
            userId: req.userId,
            hash: hash
        })
        res.json({
            message:hash
        })
    } else {
        await LinkMOdel.deleteOne({
            userId: req.userId
        })

        res.json({
            message: "Remove link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink
    const link = await LinkMOdel.findOne({
        hash
    })

    if (!link){
        res.status(411).json({
            message: "Sorry incorrect inputs"
        })
        return
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    res.json({
        username: user?.username,
        content:content
    })

})

app.listen(PORT, HOST, async () => {
    await mongoose.connect(process.env.MONGDB_URL as string) 
    console.log("successfully connected mongdb", process.env.MONGDB_URL)
})

