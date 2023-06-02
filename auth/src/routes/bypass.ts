import express from 'express'

const router = express.Router()

router.post('/api/users/bypass', (req, res) => {
    res.send('Hi from bypass')
})

export { router as bypassRouter }
