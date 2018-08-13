const {app,BrowserWindow} = require('electron');
const path = require("path");
const url = require("url");

let win;

function createWindow(){
    let {width, height} = require('electron').screen.getPrimaryDisplay().size
    win = new BrowserWindow({width:width,height:height});


    win.loadURL(url.format({
        pathname:path.join(__dirname,'/file/index.html'),
        protocol: 'file:',
        slashes:true
    }));

    win.webContents.openDevTools();

    win.on('closed',()=>{
        win = null;
    });
}
app.on('ready',createWindow);
app.on('window-all-closed',() => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});