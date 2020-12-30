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

// Gönderme fonksiyonu
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




// Databaseden gelen

ipcRenderer.on("key:database", (e, database) => {
    console.log(database);
})




// Backendden geri al
ipcRenderer.on("key:addItem", (e, newTodo) => {

    // // Frontende yaz >
    //container
    const container = document.querySelector(".todo-list");

    //li
    const li = document.createElement('li');
    li.className = "liste";
    li.setAttribute('data-id', newTodo.id);
    
    // span > checkbox
    const checkbox = document.createElement('span');
    checkbox.className = "checkbox";

    // i > done
    const doneIcon = document.createElement("i");
    doneIcon.className = "fas fa-check";

    // span > textbox
    const spanText = document.createElement("span");
    spanText.className = "mission-text";
    spanText.innerText = newTodo.text;
    
    // span > delete
    const spanDelete = document.createElement("span");
    spanDelete.className= "delete";

    // i > deleteIcon
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash delete";

    

    spanDelete.addEventListener("click", (e) => {
        if (confirm("Gerçekten silmek istiyormusun?")) {
            deleter(e.target);

        }
    })
    
    checkbox.appendChild(doneIcon);
    li.appendChild(checkbox);
    li.appendChild(spanText);
    spanDelete.appendChild(deleteIcon);
    li.appendChild(spanDelete);
    container.appendChild(li);
    
});

function deleter(hedef) {
    hedef.parentNode.parentNode.parentNode.remove();
}

 
 



    







// Exit button
const exitButton = document.querySelector('#exitButton');
exitButton.addEventListener('click', exitProgram);
function exitProgram(e){
    ipcRenderer.send("key:exitButton");
}