let firstName = document.querySelector("#nomeUsuario");
let nameUsersP =document.querySelector("#nomeUsuario");
let fechaApp =document.querySelector("#closeApp");
let newTask =document.querySelector("#novaTarefa");
let buttonCreateTask =document.querySelector("#buttonCreateTask");
let tarefasPendente 
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

function criarTarefas(){ 
    
    let task = { 
        description: newTask.value,
        completed: false,
    }
fetch(`${baseUrlApi()}/tasks`,{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
        authorization:`${localStorage.getItem("jwt")}`
    },
     body:JSON.stringify(task),

}).then((response)=> {
    console.log(response)
return response.json()
}
).then((data)=>{
console.log(data)

})
}
buttonCreateTask.addEventListener("click",(event)=>{
    event.preventDefault()
    criarTarefas()
    })

    function buscarTarefas(){ 
        console.log(localStorage.getItem("jwt"))
    fetch(`${baseUrlApi()}/tasks`,{
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
//    tarefasPendente=data
    console.log(data[0].description)
    })
    }
    buscarTarefas();
    console.log(tarefasPendente)
    