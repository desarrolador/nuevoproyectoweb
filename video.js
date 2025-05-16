document.getElementById("mivideo").addEventListener("click"),
        function(){
        var video = document.getElementById("mivideo");
    } 
    if(video.paused){
            video.onplay();
    }else{
            video.pause();
    }