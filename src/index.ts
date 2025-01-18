import { app, BrowserWindow, ipcMain } from 'electron';
import { PAGES_DIR } from './consts';
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    title: "Atcard",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });

  const indexHTML = path.join(__dirname, PAGES_DIR, '/index.html');
  win.loadFile(indexHTML)
}

app.on('ready', () => {
  console.log('App is ready');

  ipcMain.handle('ping', () => 'pong')

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})