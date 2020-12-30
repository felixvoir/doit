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
const deleteAll = document.querySelector('#cleaner');
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
    

    // button > done
    const completeButton = document.createElement("button");
    completeButton.className = "btn-icon btn-check";
    completeButton.setAttribute('data-id',newTodo.id);
    completeButton.innerHTML = '<i id="iconNan" class="fas fa-check"></i>';

    // span > textbox
    const spanText = document.createElement("span");
    spanText.className = "mission-text";
    spanText.innerText = newTodo.text;
    

    // button > deletecomplete
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-icon btn-delete";
    deleteButton.setAttribute('data-id', newTodo.id);
    deleteButton.innerHTML = '<i id="iconNan" class="fas fa-trash"></i>';


    deleteButton.addEventListener("click", (e) => {
        if (confirm("Gerçekten silmek istiyormusun?")) {
            e.preventDefault()
            deleter(e.target);
            const did = e.target.getAttribute("data-id");
            ipcRenderer.send("deleteGoal", did)
        }
    })

    completeButton.addEventListener("click", (e) => {

            e.preventDefault()
            deleter(e.target);
            const did = e.target.getAttribute("data-id");
            ipcRenderer.send("completeGoal", did)

    })
    
    
    li.appendChild(completeButton);
    li.appendChild(spanText);
    li.appendChild(deleteButton);
    container.appendChild(li);
}


deleteAll.addEventListener("click", (e) => {

    e.preventDefault()
    const area = document.querySelector('#todo-list');
    area.innerHTML = "";
    ipcRenderer.send("deleteAll", "sil");

})


function deleter(hedef) {
    
    hedef.parentNode.remove();
}


 



    







// Exit button
const exitButton = document.querySelector('#exitButton');
exitButton.addEventListener('click', exitProgram);
function exitProgram(e){
    ipcRenderer.send("key:exitButton");
}

