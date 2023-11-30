import express, {Request, Response} from 'express'

import {userRouter} from "./users/users.js";

const port = 8000
const app = express()

app.get('/hello', (req: Request, res: Response) => {
    res.end()
})

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

