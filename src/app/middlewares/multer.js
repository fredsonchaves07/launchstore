// Necessário realizar a instalação da biblioteca de multer
const multer = require('multer')

// Realiza a lógica de armazenamento da imagem do disco
const storage = multer.diskStorage({
    // Salvar a imagem
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },

    // Seta o nome do arquivo
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`)
    }
})

// Identifica o tipo de arquivo do mimetipe e realiza o filtro
const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(acceptedFormat => {
        return acceptedFormat == file.mimetype
    })

    if(isAccepted){
        return cb(null, true)
    }

    return cb(null, false)
}

module.exports = multer({
    storage,
    fileFilter,
})