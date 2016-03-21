/**
 * Created by acer on 2016/3/22.
 */
var musicBtn = document.getElementById("musicBtn");
var musicAudio = document.getElementById("audio1");
window.addEventListener("load", function () {
    musicAudio.play();
    musicAudio.addEventListener("canplay", function () {
        musicBtn.style.display = "block";
        musicBtn.className = "music move";
    }, false);
    musicBtn.addEventListener("touchend", function () {
        if (musicAudio.paused) {
            musicAudio.play();
            musicBtn.className = "music move";
        } else {
            musicAudio.pause();
            musicBtn.className = "music";
        }
    }, false);
}, false);