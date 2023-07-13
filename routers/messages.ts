import express from "express"
import db from "../prisma/db"
const router = express.Router()

router.get('/', async (req, res) => {
    const messages = await db.message.findMany({
        take: 50
    });
    const result = await Promise.all(messages.map(async m => ({
        text: m.text,
        date: m.date,
        username: (await db.user.findUnique({
            where: {
                id: m.userId
            }
        })).username
    })))
    res.json(result)
})

router.post('/', async (req, res) => {
    if (!req.body.text) {
        res.status(401).json({ message: "text is empty" })
        return
    }
    const message = await db.message.create({
        data: {
            text: req.body.text,
            date: new Date(),
            userId: req.user.id
        }
    })
    res.json({ message: "successfully added" })
})

export default router