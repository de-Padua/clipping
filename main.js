const {
  app,
  BrowserWindow,
  desktopCapturer,
  contextBridge,
ipcMain
} = require("electron");
const { dialog } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");


  ipcMain.on('client-event', (event, arg) => {
    console.log(arg); // Prints: 'Hello from the client!'
    
    desktopCapturer
      .getSources({ types: ["window", "screen"] })
      .then(async (sources) => {
        dialog
          .showMessageBox({
            message: "Select a window or screen to capture:",
            buttons: sources.map((source) => source.name),
          })
          .then(({ response }) => {
            // Use the selected source
            const selectedSource = sources[response];

            win.webContents.send(
              "SET_SOURCE",
              selectedSource.id
            );

            console.log(sources)

            return;
          })
          .catch((err) => {
            // Handle any errors
          });
      });

  });


};

ipcMain.on('stop-record',(event,arg)=>{

  
    
})


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();
});




  

