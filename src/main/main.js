import { app, ipcMain, dialog, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow;
// eslint-disable-next-line no-undef
const isDev = process.env.NODE_ENV === "development";

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: path.join(__dirname, "../preload/preload.js"),
      webSecurity: true,
    },
    autoHideMenuBar: true,
  });

  // Vite dev server URL
  mainWindow.loadURL(
    isDev
      ? "http://localhost:5173"
      : // eslint-disable-next-line no-undef
        path.join(__dirname, "../renderer/index.html")
  );
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.webContents.openDevTools({
    mode: "undocked",
  });
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  createWindow();
});

app.on("window-all-closed", () => {
  // eslint-disable-next-line no-undef
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
