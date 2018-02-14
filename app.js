const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 950,
    height: 600,
    frame: false,
    resizable: false
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.setMenu(null);
  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

app.on('ready', createWindow);
