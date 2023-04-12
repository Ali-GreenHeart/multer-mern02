import multer from "multer"
import path from "path"

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
export default upload;
