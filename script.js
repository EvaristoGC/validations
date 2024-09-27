const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const passwordConfirmation = document.querySelector('#password-confirmation')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    checkForm()
})

//Verificar se o input está ok após perder o foco
username.addEventListener('blur', () => {
    checkInputUsername()
})
email.addEventListener('blur', () => {
    checkInputEmail()
})
password.addEventListener('blur', () => {
    checkInputPassword()
})
passwordConfirmation.addEventListener('blur', () => {
    checkInputPasswordConfirmation()
})

//Função para validar o nome do usuário
function checkInputUsername() {
    const usernameValue = username.value

    if (usernameValue === "") {
        errorInput(username, "Preencha um username")
    } else {
        const formItem = username.parentElement
        formItem.className = "form-content"
    }
}

//Função para validar o e-mail
function checkInputEmail() {
    const emailValue = email.value

    if (emailValue === "") {
        errorInput(email, "O e-mail é obrigatório.")
    } else if (!isEmailValid(emailValue)) {
        errorInput(email, "E-mail inválido.")
    } else {
        const formItem = email.parentElement
        formItem.className = "form-content"
    }
}

function isEmailValid(email) {
    //Criação de regex
    const emailRegex = new RegExp(
        /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,}$/gi
    )

    if (emailRegex.test(email)) {
        return true
    }

    return false
}

//Função para validar a senha
function checkInputPassword() {
    const passwordValue = password.value

    if (passwordValue === "") {
        errorInput(password, "A senha é obrigatória.")
    } else if (passwordValue.length < 8) {
        errorInput(password, "A senha precisa ter no mínimo 8 caracteres.")
    } else {
        const formItem = password.parentElement
        formItem.className = "form-content"
    }
}

//Função para validar a confirmação da senha
function checkInputPasswordConfirmation() {
    const passwordValue = password.value
    const passwordConfirmationValue = passwordConfirmation.value

    if (passwordConfirmationValue === "") {
        errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.")
    } else if (passwordValue !== passwordConfirmationValue) {
        errorInput(passwordConfirmation, "As senhas não são iguais.")
    } else {
        const formItem = passwordConfirmation.parentElement
        formItem.className = "form-content"
    }
}

//Função para exibir a mensagem de erro
function errorInput(input, message) {
    const formItem = input.parentElement
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message

    formItem.classList = "form-content error"
}

//Checar o formulário antes do envio
function checkForm() {
    checkInputUsername()
    checkInputEmail()
    checkInputPassword()
    checkInputPasswordConfirmation()

    const formItem = form.querySelectorAll(".form-content")
    const isValid = [...formItem].every((item) => {
        return item.className === "form-content"
    })

    if (isValid) {
        form.submit()
        alert('Cadastrado com sucesso')
    }
}