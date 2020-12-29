const menu = document.querySelector('#hamburger');
const dropdown = document.querySelector('.dropdown');
const electron = require('electron');
const { ipcRenderer } = electron;


// HMB MENU
menu.addEventListener('click', function(){
    // Check dislay situation
    const styleOf = getComputedStyle(dropdown);
    
    if (styleOf.display === "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
});


// APPENDING & ANIMATING

const addGoal = document.querySelector('#addGoal');
// container
const todoList = document.querySelector('#todo-list');
// Ateşle
addGoal.addEventListener('keyup', sendGoal);


function sendGoal(e){

    if(e.keyCode === 13){
        e.preventDefault();
        let todo = addGoal.value;

        // Kutuyu Temizle
        addGoal.value = "";

        // Backend'e gönder >
        ipcRenderer.send("key:newGoal",todo);   
    }
}

// Backendden geri al
ipcRenderer.on("key:addItem", (err, newTodoList) => {
        
    const index = newTodoList.length -1;

    // // Frontende yaz >
    todoList.insertAdjacentHTML('beforeend',`<li data-id="${newTodoList[index].id}"><span class="checkbox"><i class="fas fa-check"></i></span> <span class="mission-text"><p>${newTodoList[index].text}</p></span> <span class="delete"><i class="fas fa-trash"></i></span></li>`)
        
});


// Exit button
const exitButton = document.querySelector('#exitButton');
exitButton.addEventListener('click', exitProgram);
function exitProgram(e){
    ipcRenderer.send("key:exitButton");
}