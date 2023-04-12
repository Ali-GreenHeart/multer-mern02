import express from 'express'
import upload from './multer.js'
import path from 'path'

const app = express()
const users = []


app.use(express.urlencoded())
app.use(express.static('images'))
app.post('/signup', upload.single('picture'), (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        fileName: req.file.filename
    }
    users.push(newUser)
    res.redirect('/sign-in')
})
app.post('/signin', (req, res) => {
    const user = users.find((istifadeci) => istifadeci.email === req.body.email)
    if (user.password === req.body.password) {
        res.redirect(`/profile/${user.email}`)
    }
})
app.get('/sign-up', (req, res) => {
    res.sendFile(path.resolve("./pages/sign-up.html"))
})
app.get('/sign-in', (req, res) => {
    res.sendFile(path.resolve("./pages/sign-in.html"))
})
app.get('/profile/:email', (req, res) => {
    const email = req.params.email
    const user = users.find((ist) => ist.email === email)

    const html = `
    <h1>Name: ${user.name}</h1>
    <h3>Email: ${user.email}</h3>
    <h5>Password: ${user.password}</h5>
    <img src="${'/' + user.fileName}" />
    `

    res.send(html)
})
app.listen(5050, () => {
    console.log('server is up...')
})

