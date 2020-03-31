const {app, BrowserWindow} = require('electron')    


function createWindow () {   
  // Create the browser window.     
	win = new BrowserWindow({width: 800, height: 600}) 
	       
	win.loadURL('http://localhost:8080/')
}      
app.on('ready', createWindow) 