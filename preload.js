// In the preload script.
const { ipcRenderer, contextBridge,ipcMain } = require("electron");




function handleStream(stream) {
  const video = document.querySelector("video");
  video.srcObject = stream;
  video.onloadedmetadata = (e) => video.play();
  

  console.log(video);
}

function handleError(e) {
  console.log(e);
}

window.addEventListener("DOMContentLoaded", () => {
 



 document.getElementById("record").addEventListener('click',()=>{
  ipcRenderer.send('client-event', 'Hello from the client!');
 })





 document.getElementById("stop-record").addEventListener('click',()=>{
  

 })





  ipcRenderer.on("SET_SOURCE", async (event, sourceId) => {

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: sourceId,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      });


       handleStream(stream);
    } catch (e) {
      handleError(e);
    }
  });
});
