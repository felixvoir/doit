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
const todoList = document.querySelector('#todo-list');

addGoal.addEventListener('keyup', sendGoal);

function sendGoal(e){
    if(e.keyCode === 13){
        e.preventDefault();
        let todo = addGoal.value;

        // Frontende yaz >
        todoList.insertAdjacentHTML('beforeend',`<li><span class="checkbox"><i class="fas fa-check"></i></span> <span class="mission-text"><p>${todo}</p></span> <span class="delete"><i class="fas fa-trash"></i></span></li>`)
        
        // Backend'e gönder >
        ipcRenderer.send("key:newGoal",todo);
        
        // Kutuyu Temizle
        addGoal.value = "";
    }
}

// Exit button

const exitButton = document.querySelector('#exitButton');

exitButton.addEventListener('click', exitProgram);

function exitProgram(e){
    ipcRenderer.send("key:exitButton");
}