const electron = require('electron');
const url = require('url');
const path = require('path');
const { exit } = require('process');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
let todoList = [];

app.on('ready', () => {
    console.log('Program başladı');

    mainWindow = new BrowserWindow(
        {width: 450, height: 750,frame:false,
            webPreferences: {

                nodeIntegration: true
        
              }
        }
        
        );

    // mainWindow.setMenuBarVisibility(false)
    // Menu.setApplicationMenu(null)

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol: "file:",
            slashes: true
        })
    );

    ipcMain.on("key:newGoal", (err, data) => {
        if (data) {
            todoList.push({
                id: todoList.length + 1,
                text: data
            });
            getTodoList();
            mainWindow.webContents.send("key:addItem", todoList);
        }
    });

    ipcMain.on("key:exitButton", (err, data) =>{
        exit();
    }); 


});

function getTodoList(){
    console.log(todoList);
}