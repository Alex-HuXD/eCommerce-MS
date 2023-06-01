import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello from root')
})

app.listen(3000, () => {
    console.log('listen on port 3000!!!!!')
})
