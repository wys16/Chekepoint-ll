let firstName = document.querySelector("#nomeUsuario")

function buscarUsuario(){ 
    console.log(localStorage.getItem("jwt"))
fetch(`${baseUrlApi()}/users/getMe`,{
    method:"GET",
    headers:{
        "Content-Type": "application/json",
        authorization:`${localStorage.getItem("jwt")}`
    },

}).then((response)=> {
    console.log(response)
return response.json()
}
).then((data)=>{
    console.log(data)
console.log(data.firstName)
firstName.innerText= `${data.firstName} ${data.lastName}`
})
}
buscarUsuario();