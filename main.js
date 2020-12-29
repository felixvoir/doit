const electron = require('electron');
const url = require('url');
const path = require('path');
const { exit } = require('process');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

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
        console.log(data);
    });

    ipcMain.on("key:exitButton", (err, data) =>{
        exit();
    }); 


});