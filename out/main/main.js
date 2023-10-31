"use strict";
const electron = require("electron");
let mainWindow;
function createWindow() {
  mainWindow = new electron.BrowserWindow({});
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => mainWindow = null);
}
electron.app.whenReady().then(() => {
  createWindow();
});
