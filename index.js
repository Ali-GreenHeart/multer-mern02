import express from 'express'
import multer from 'multer'
import path, { extname } from 'path'


const app = express()
const users = []

const storage = multer.diskStorage({
destination: (req, file, callback) => {
callback(null, path.resolve('./images'))
},
    filename: (req, file, callback) => {
let extName = path.extname(file.originalname)
callback(null, "shekil" + Date.now() + extName)
    }
})

const upload = multer({ storage })

app.get('/sign-up', (req, res) => {
res.sendFile(path.resolve("./pages/sign-up.html"))
})
app.post('/signup', upload.single('picture'), (req, res) => {
const file = req.file
console.log(file)
res.send('qeydiyyat ugurlar tamamlandi')
})
app.get('/sign-in', (req, res) => {
    res.sendFile(path.resolve("./pages/sign-in.html"))
})
app.get('/profile', (req, res) => {
    res.send('profile sehifesi')
})
app.listen(5050, () => {
    console.log('server is up...')
})



