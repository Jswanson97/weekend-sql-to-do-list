console.log('JS is sourced!');

function renderItems(array) {
    let tableBody = document.getElementById("viewToDo");
    tableBody.innerHTML = ''
    for (const todos of array) {
        let complete = ''
        if(todos.isComplete == false){
            complete = `<button onClick='markComplete(${todos.id})'>
             Complete task
            </button>`
        }
        tableBody.innerHTML += `
        <div class="${todos.isComplete ? "completed" : ""}" id="markComplete-${todos.id}">
            <span>${todos.text}</span>
            <button onClick='deleteToDo(${todos.id})'>
            Delete task
            </button>
            ${complete}
        </div>`
    }
}

getToDos()

function updateReady(toDoId){
    axios.put(`/todos/${toDoId}`)
    .then((response) => {
        getToDos()
    })
    .catch((error) => {
        console.log('Error in updateReady', error);
    })
}

function getToDos(){
    console.log('in getToDos');
    axios.get('/todos')
    .then((response) => {
        console.log(response.data);
        renderItems(response.data)
    })
    .catch((error) => {
        console.log('error in getToDos', error);
    })
}

function submitToDo(){
   // event.preventDefault()
    let newToDo = {
        text: document.getElementById(`toDo`).value
    }
    console.log(newToDo)
    axios.post('/todos', newToDo)
    .then((response) => {
        getToDos()
        console.log('in post request')
    })
    .catch((error) => {
        console.log('error in post function', error);
    })
}

function deleteToDo(toDoId){
    axios.delete(`/todos/${toDoId}`)
    .then((response) => {
        getToDos();
    })
    .catch((error) => {
        console.log('error in delete', error);
    })
}

function markComplete(toDoId){
    let row = document.getElementById(`markComplete-${toDoId}`)
    row.classList.add('completed')
    axios.put(`/todos/update/${toDoId}`, {markComplete:true}, {headers: {"Content-Type": "application/json"}})
    .then((response) => {
        getToDos()
        console.log('in markComplete')
    })
    .catch
}