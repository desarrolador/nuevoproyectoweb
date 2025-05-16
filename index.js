const video = Document.getElementById("mivideo");

function playVideo(seconds) {
    video.play()
}


function pauseVideo(seconds) {
    video.pause()
}

function volumeUp (amount) {
    if (video.volume + amount <=1){
         video.volume += amount ;
    }else {
        video.volume = 1;//asegura que no supere el maximo
    }
}

function volumeDown (amount) {
    if (video.volume - amount >=0 ) {
        video.volume -= amount;
    } else {
        video.volume = 0;//asegura que no sea menor a 0
    }
}
