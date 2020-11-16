module.exports = {
    formatPrice(price) {
        return value = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price / 100)
    },

    formatCpfCnpj(value){
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

    formatCep(value){
        if(value.length > 9){
            value = value.slice(0, -1)
        }

        value = value.replace(/\D/g, "")
        value = value.replace(/(\d{5})(\d)/, "$1-$2")

        return value
    },
}