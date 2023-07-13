import express from 'express'
import db from '../prisma/db'
import { createJWT } from '../utils/jwt'
import { comparePass, hash } from '../utils/hasher';

const router = express.Router();

//create user
router.post('/', async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    }

    if (await db.user.findUnique({
        where: {
            username: user.username
        }
    })) {
        res.status(401).json({ message: "username is taken" })
        return
    }

    const createdUser = await db.user.create({
        data: {
            password: await hash(user.password),
            username: user.username
        }
    })
    const token = createJWT(createdUser);

    res.json({ token })
})

router.post('/signin', async (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password,
    }

    const foundUser = await db.user.findUnique({
        where: {
            username: user.username
        }
    })

    if (!foundUser || !comparePass(user.password, foundUser.password)) {
        res.status(401).json({ message: "username or password is wrong" })
        return
    }

    const token = createJWT(foundUser);

    res.json({ token })
})

export default router