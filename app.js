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

ipcRenderer.on("init", (e, database) => {
    
    database.forEach(todo => {
        addElement(todo);
    });
})



// Backendden geri al
ipcRenderer.on("key:addItem", (e, newTodo) => {

    addElement(newTodo);
    
});


// DOM Üzerinde elementleri oluştur.
function addElement(newTodo) {
        // // Frontende yaz >
    //container
    const container = document.querySelector(".todo-list");

    //li
    const li = document.createElement('li');
    li.className = "liste";
    


    // i > done
    const insertButton = document.createElement("button");
    insertButton.className = "btn-icon";
    insertButton.setAttribute('data-id',newTodo.id);
    insertButton.innerText = "T";

    // span > textbox
    const spanText = document.createElement("span");
    spanText.className = "mission-text";
    spanText.innerText = newTodo.text;
    

    // Button
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-icon";
    deleteButton.setAttribute('data-id', newTodo.id);
    deleteButton.innerText = "X";

    // i > deleteIcon
    // const deleteIcon = document.createElement("i");
    // deleteIcon.className = "fas fa-trash delete";
    
    

    

    deleteButton.addEventListener("click", (e) => {
        if (confirm("Gerçekten silmek istiyormusun?")) {
            e.preventDefault()
            deleter(e.target);
            const did = e.target.getAttribute("data-id");
            ipcRenderer.send("deleteGoal", did)
        }
    })
    
    
    li.appendChild(insertButton);
    li.appendChild(spanText);
    li.appendChild(deleteButton);
    container.appendChild(li);
}

function deleter(hedef) {
    
    hedef.parentNode.remove();
}

 
 



    







// Exit button
const exitButton = document.querySelector('#exitButton');
exitButton.addEventListener('click', exitProgram);
function exitProgram(e){
    ipcRenderer.send("key:exitButton");
}

