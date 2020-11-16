

const Mask = {
    apply(input, func){
        setTimeout(() => {
            input.value = Mask[func](input.value)
        }, 1)
    },

    formatBRL(value){
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)
    },

    cpfCnpj(value){
        value = value.replace(/\D/g, "")

        if(value.length > 14){
            value = value.slice(0, -1)
        }

        if(value.length > 11){
            value = value.replace(/(\d{2})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            value = value.replace(/(\d{4})(\d)/, "$1-$2")
        } else {
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1-$2")
        }

        return value
    },

    cep(value){
        if(value.length > 9){
            value = value.slice(0, -1)
        }

        value = value.replace(/\D/g, "")
        value = value.replace(/(\d{5})(\d)/, "$1-$2")

        return value
    },
}

const Validate = {
    apply(input, func){
        Validate.clearError(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if(results.error){
            Validate.displayError(input, results.error)
        }
    },

    clearError(input){
        const errorDiv = input.parentNode.querySelector('.error')

        if(errorDiv){
            errorDiv.remove()
        }
    },

    displayError(input, error){
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },

    isEmail(value) {
        let error = null
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat)){
            error = 'Email inválido'
        }

        return {
            error,
            value
        }
    },

    isCpfCnpj(value){
        let error = null
        const clearValues = value.replace(/\D/g, '')

        if(clearValues.length > 11 && clearValues.length != '14'){
            error ='CNPJ incorreto'
        } else if(clearValues.length < 12 && clearValues.length != 11){
            error = 'CPF incorreto'
        }

        return {
            error,
            value
        }
    },

    isCep(value){
        let error = null
        const clearValues = value.replace(/\D/g, '')

        if(clearValues.length != 8){
            error ='CEP incorreto'
        }

        return {
            error,
            value
        }
    }
}

const PhotosUpload = {
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    input: "",

    handleFileInput(event){
        const {files: fileList} = event.target
        PhotosUpload.input = event.target

        // Verifica se possui tem algum limite no envio de foto
        if(PhotosUpload.hasLimit(event)) {
            return 
        }

        Array.from(fileList).forEach(file => {
            // Colocando arquivos dentro para tratar casos de atualização de imagens
            PhotosUpload.files.push(file)

            // Ler o arquivo e transforma para o padão BTU
            const reader = new FileReader()

            reader.onload = () => {
                //Cria a imagem
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                // Adiciona a div na div de previsualização de fotos
                PhotosUpload.preview.appendChild(div)

            }

            // Quando tiver carregado será executado o onload
            reader.readAsDataURL(file)
        })
        
        // Substitui o fileList padrão do navegador por um fileList manipulável
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },

    // Função que retorna todos os FileList
    getAllFiles(){
        // Cria um data transfer que transforma o array em um tipo FileList
        const dataTransfer = new DataTransfer() || new  ClipboardEvent('') 

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },

    // Função que verifica se possui alguma limitação no envio de imagens
    hasLimit(event){
        const {uploadLimit, input, preview} = PhotosUpload
        const {files: fileList} = input

        if(fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            //Bloqueia o envio. Tornando o comportamento padrão
            event.preventDefault()
            return true
        }

        // Lógica de identificação da quantidade de fotos
        const photosDiv = []

        // Pecorre as fotos que estão na previsualização de imagens
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == 'photo'){
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length

        if(totalPhotos > uploadLimit){
            alert("Atingiu o limite de fotos")
            event.preventDefault()
            return true
        }
        

        return false
    },

    // Trata um div container photo
    getContainer(image){
        const div = document.createElement('div')

        div.classList.add('photo')
        // Aplica o evento de click para remover a foto
        div.onclick = PhotosUpload.removePhoto
        // Adiciona o botão de fechar
        div.appendChild(PhotosUpload.getRemoveButton())
        // Adiciona a imagem criada na div de imagem
        div.appendChild(image)

        return div
    },

    // Recebe o botão para excluir a foto
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = 'close'

        return button

    },

    // Função que remove foto
    removePhoto(event){
        // Div de classe Photo
        const photoDiv = event.target.parentNode
        const photoArray = Array.from(PhotosUpload.preview.children)
        const index = photoArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
        
        photoDiv.remove()

    },

    removeOldPhoto(event){
        const photoDiv = event.target.parentNode
        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')

            if(removedFiles){
                removedFiles += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    }
}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),

    setImage(e){
        const {target} = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))

        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),

    open(){
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.top = 0
    },

    close(){
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeButton.top = "-80px"
    }
}
