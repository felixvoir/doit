const electron = require('electron');
const url = require('url');
const path = require('path');
const db = require('./lib/connection').db;

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

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol: "file:",
            slashes: true
        })
    );

    ipcMain.on("key:newGoal", (err, data) => {
        if (data) {
            let todo = {
                id: todoList.length + 1,
                text: data 
            };
            todoList.push(todo);

            db.query("INSERT INTO goals SET text = ?", data, (e,r,f) => {
                
            });
            
            mainWindow.webContents.send("key:addItem", todo);
        }
    });

    ipcMain.on("key:exitButton", (err, data) =>{
        process.exit()
    }); 

    mainWindow.webContents.once("dom-ready", () => {

        db.query("SELECT * FROM goals", (error, results, fields) => {
            mainWindow.webContents.send("init", results);
        });

    });

    ipcMain.on("deleteGoal", (err, data) => {
        db.query("DELETE FROM goals WHERE id = ?", data, (e,r,f) => {
            if (r.affectedRows > 0) {
                console.log("Başarılı şekilde silindi");
            }
        });
    });



});
