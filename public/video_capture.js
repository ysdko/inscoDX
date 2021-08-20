const video = document.getElementById("video")

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
}).then(stream => {
    video.srcObject = stream;
    video.play()
}).catch(e => {
    console.log(e)
})