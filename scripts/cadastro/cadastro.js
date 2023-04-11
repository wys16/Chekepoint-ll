let firtsName = document.querySelector("#inputNome")
let lastName = document.querySelector("#inputSobrenome")
let email = document.querySelector("#inputEmail")
let password = document.querySelector("#inputSenha")
let confirmPassword = document.querySelector("#inputRepetirSenha")
let singUp = document.querySelector("#criarConta")
let passwordRepeat=document.querySelector("#inputRepetirSenha")
let passwordRepeatIsValid=document.querySelector("#passwordValidacao")

let emailIsValid = false;
let passwordIsValid = false;
let firtsIsValid = false;
let lastNameIsValid = false;
let minPasswordCaracteres = 4;
let minfirtsNameCaracteres = 0;
let minlastNameCaracteres = 0;
let  firtsNameIsValid = false;

let usuario = { 
    firstName:firtsName.value,
    lastName:lastName.value,
    email:email.value,
    password:password.value
}

function cadastrar (){
    console.log()
fetch(`${baseUrlApi()}/users`,{
    method:"POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify(usuario),

}).then((response)=> {
    console.log(response)
return response.json()
}
).then((data)=>{
    console.log(data)

})
    
}

/* Verifica se ambas as informações do formulário de login foram validadas */
function validaCadastro() {
    if (emailIsValid&&passwordIsValid&&lastNameIsValid&&firtsNameIsValid&&passwordRepeat) {
        /* Ativa o botão de acesso novamente e retorna suas propriedades */
        singUp.style.backgroundColor = "#7898FF"
        singUp.innerText = "Acessar";
        singUp.removeAttribute("disabled");
        return true;
    } else {
        /* Desabilita o botão de acesso e troca suas caracteristicas*/
        singUp.style.backgroundColor = "#979292A1"
        singUp.innerText = "Bloqueado";
        singUp.setAttribute("disabled", true);
        return false;
    }
}



singUp.addEventListener("click",(event)=>{
event.preventDefault()
cadastrar()
})

email.addEventListener("keyup",() =>{
    let emailValidacao = document.querySelector("#emailValidacao")
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        emailValidacao.innerText = "E-mail inválido";
        email.style.border = "2px solid #E9554EBB"
        emailIsValid = false;
}
else{
    emailValidacao.innerText=""
    email.style.border = "2px solid transparent"
    emailIsValid = true;
}validaCadastro();
}
)

/* Validações no Input da SENHA */
password.addEventListener("keyup", () => {
    //Busca os valores atualizados dos inputs
    let passwordValidacao = document.querySelector("#passwordSingUp");
    /* Alterandoo texto do Small - Verifica se o campo é nulo/vazio */
    if (password.value.length <= minPasswordCaracteres) {
        passwordValidacao.innerText = `Faltam ${(minPasswordCaracteres + 1) - password.value.length} caracteres`;
        //Troca a cor da borda do input
        password.style.border = "2px solid #E9554EBB"
        passwordIsValid = false;

    } else {
        passwordValidacao.innerText = "";
        //Troca a cor da borda do input
        password.style.border = "2px solid transparent"
        passwordIsValid = true;
    }
    validaCadastro();
});


firtsName.addEventListener("keyup", () => {
    //Busca os valores atualizados dos inputs
    let firtsNameValidacao = document.querySelector("#nameSingUp");
    /* Alterandoo texto do Small - Verifica se o campo é nulo/vazio */
    if (firtsName.value.length ==  minfirtsNameCaracteres) {
        firtsNameValidacao.innerText = ` Este campo é obrigatorio`;
        //Troca a cor da borda do input
        firtsName.style.border = "2px solid #E9554EBB"
        firtsNameIsValid = false;

    } else {
        firtsNameValidacao.innerText = "";
        //Troca a cor da borda do input
        firtsName.style.border = "2px solid transparent"
        firtsNameIsValid = true;
    }
    validaCadastro();
});

lastName.addEventListener("keyup", () => {
    //Busca os valores atualizados dos inputs
    let lastNameValidacao = document.querySelector("#lastnameSingUp");
    /* Alterandoo texto do Small - Verifica se o campo é nulo/vazio */
    if (lastName.value.length ==  minlastNameCaracteres ) {
        lastNameValidacao.innerText = ` Este campo é obrigatorio`;
        //Troca a cor da borda do input
        lastName.style.border = "2px solid #E9554EBB"
        lastNameIsValid = false;

    } else {
        lastNameValidacao.innerText = "";
        //Troca a cor da borda do input
        lastName.style.border = "2px solid transparent"
        lastNameIsValid = true;
    }
    validaCadastro();
});



passwordRepeat.addEventListener("keyup", () => {
    let senhaDigitada = normalizaStringUsandoTrim(password.value)
    let senhaArmazenada=normalizaStringUsandoTrim(passwordRepeat.value) 
    /* Verifica se a senha tem pelo menos minPasswordCaracteres caracteres */
    if (senhaDigitada.length < minPasswordCaracteres) {
        passwordRepeatIsValid.innerText = `A senha deve ter pelo menos ${minPasswordCaracteres} caracteres`;
        password.style.border = "2px solid #E9554EBB";
        passwordIsValid = false;
    } else if  (senhaDigitada === senhaArmazenada) {
        passwordRepeatIsValid.innerText = "";
            password.style.border = "2px solid transparent";
            passwordIsValid = true;
        } else {
            passwordRepeatIsValid.innerText = "senhas não coincidem";
            password.style.border = "2px solid #E9554EBB";
            passwordIsValid = false;
        }
        validaCadastro();
    }
    
);