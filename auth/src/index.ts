import express from 'express'

const app = express()
app.use(express.json())

app.get('/api/users/currentuser', (req, res) => {
    res.send('hello from root. current user in dev mode')
})

app.listen(3000, () => {
    console.log('listen on port 3000!!!!!')
})
