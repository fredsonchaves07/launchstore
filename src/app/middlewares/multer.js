const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`)
    }
})

console.log(storage)

const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(acceptedFormat => {
        return acceptedFormat == file.mimetype
    })

    console.log(isAccepted)

    if(isAccepted){
        return cb(null, true)
    }

    return cb(null, false)
}

console.log(fileFilter)

module.exports = multer({
    storage,
    fileFilter,
})