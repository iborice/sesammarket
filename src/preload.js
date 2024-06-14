// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require('electron');
//import  { ipcRenderer, contextBridge }  from 'electron';

contextBridge.exposeInMainWorld('api', {

    authUser:(args) => ipcRenderer.invoke('auth-user', args),
    getProduct:(args) => ipcRenderer.invoke('sale-product', args),
  // Invoke Methods
  testInvoke: (args) => ipcRenderer.invoke('test-invoke', args),
  // Send Methods
  testSend: (args) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) })
});
