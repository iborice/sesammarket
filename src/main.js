const { app, BrowserWindow, ipcMain  } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs'); 
const isDev = require('electron-is-dev');

const dbPath = isDev
          ? path.join(__dirname, '../../db/billing.db') // my root folder if in dev mode
          : path.join(process.resourcesPath, '../db/billing.db');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: isDev ? path.join(__dirname, 'preload.js') : path.join(app.getAppPath(), './build/preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  isDev 
  ? mainWindow.webContents.openDevTools() : "";
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('auth-user', async (event,args) => {
  //db.get('select * from User');
  try {
    const data = await db_request(args.username,args.password); // remove .then
    return data;
    // to send back to renderer.js later
  } catch (error) {
    console.log(error);
  }

})

ipcMain.handle('sale-product', async (event,args) => {
  //db.get('select * from User');
  try {
    const data = await get_product(args.reference); // remove .then
    return data;
    // to send back to renderer.js later
  } catch (error) {
    console.log(error);
  }

})

let db_request = (username,password) => {

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the billing database.');
  });

  return new Promise((resolve, reject) => { // return a promise
    // I think you dont need serialize for this case
    db.get('select * from user where username=?', [username], (err,data) =>{
      //data.password===args.password ? return data :
      if(err) reject(err);

      if(data && bcrypt.compareSync(password, data.password)){
        resolve(data)
      }else{
        reject(null)
      }
    });
  })
}

let get_product = (reference) => {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the billing database.');
  });
  return new Promise((resolve, reject) => { // return a promise
    db.get('select * from product where reference=?', [reference], (err,data) =>{
      if(err) reject(err);
      resolve(data)
    });
  })
}

let search_product = (search) => {

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the billing database.');
  });

  return new Promise((resolve, reject) => { // return a promise
    // I think you dont need serialize for this case
    db.get("select * from product where reference=? or name=? limit 5", ['%'+search+'%','%'+search+'%' ], (err,data) =>{
      //data.password===args.password ? return data :
      if(err) reject(err);
      resolve(data);
    });
  })
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
