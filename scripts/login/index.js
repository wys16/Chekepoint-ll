/* Captura os elementos do formulário de login */
let emailLogin = document.querySelector("#inputEmail");
let passwordLogin = document.querySelector("#inputPassword");
let botaoAcessarLogin = document.querySelector("#botaoAcessarLogin");
console.log(botaoAcessarLogin)


botaoAcessarLogin.style.backgroundColor = "#979292A1"
botaoAcessarLogin.innerText = "Bloqueado";


let emailIsValid = false;
let passwordIsValid = false;
let minPasswordCaracteres = 4;

botaoAcessarLogin.addEventListener("click",(e)=>{
e.preventDefault()
loginApi();
})

function loginApi(){
    let usuario = { 
    email: emailLogin.value,
    password:passwordLogin.value
    }
    
fetch(`${baseUrlApi()}/users/login`,{
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
    console.log(data.jwt)
    
 
}).catch(error => {console.log(error)}) 
}



function loginSucesso(token) {
    console.log(token);
    alert("Sucesso no Login");
}
function loginErro(erro) {
    console.log(erro);
    if (erro.status == 400 || erro.status == 404) {
        alert("E-mail e/ou senha inválidos");
    }
}



function validaLogin() {
    if (emailIsValid && passwordIsValid) {
        botaoAcessarLogin.style.backgroundColor = "#7898FF"
        botaoAcessarLogin.innerText = "Acessar";
        botaoAcessarLogin.removeAttribute("disabled");
        return true;
    } else {
        botaoAcessarLogin.style.backgroundColor = "#979292A1"
        botaoAcessarLogin.innerText = "Bloqueado";
        botaoAcessarLogin.setAttribute("disabled", true);
        return false;
    }
}


emailLogin.addEventListener("keyup", () => { 
    
    emailLogin = document.querySelector("#inputEmail");
    let emailValidacao = document.getElementById("emailValidacao");


    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailLogin.value)) {
        emailValidacao.innerText = "E-mail inválido";
        emailLogin.style.border = "2px solid #E9554EBB"
        emailIsValid = false;

    } else {
        emailValidacao.innerText = "";
        emailLogin.style.border = "2px solid transparent"
        emailIsValid = true;
    }
    
    validaLogin();
});


passwordLogin.addEventListener("keyup", () => {
    passwordLogin = document.querySelector("#inputPassword");
    let passwordValidacao = document.getElementById("passwordValidacao");
    
    if (passwordLogin.value.length <= minPasswordCaracteres) {
        passwordValidacao.innerText = `Faltam ${(minPasswordCaracteres + 1) - passwordLogin.value.length} caracteres`;
            passwordLogin.style.border = "2px solid #E9554EBB"
        passwordIsValid = false;

    } else {
        passwordValidacao.innerText = "";
           passwordLogin.style.border = "2px solid transparent"
        passwordIsValid = true;
    }
    validaLogin();
});