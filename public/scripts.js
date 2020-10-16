

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

    formatCPF(value){

    }
}

const PhotosUpload = {
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,

    handleFileInput(event){
        const {files: fileList} = event.target
        
        // Verifica se possui tem algum limite no envio de foto
        if(PhotosUpload.hasLimit(event)) {
            return 
        }

        Array.from(fileList).forEach(file => {
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
    },

    // Função que verifica se possui alguma limitação no envio de imagens
    hasLimit(event){
        const {uploadLimit} = PhotosUpload
        const {files : fileList} = event.target

        if(fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            //Bloqueia o envio. Tornando o comportamento padrão
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

        photoDiv.remove()

    }
}

