
/**********************************************************
 *                    Classes Declaration                 *
 **********************************************************/
// Descirbe the class in short details.
// what is it for? what does it control?  etc..
class Controller {
    constructor(video) {
        this.video = video;
    }

    playVid() {
        this.video.play();
    }

    pauseVid() {
        this.video.pause();
    }

    toggle() {
        if (!this.video.paused) {
            this.pauseVid();
        }
        else {
            this.playVid();
        }
    }
}

// Descirbe the class in short details.
// what is it for?  etc..
class Timer {
    constructor(video) {
        this.seconds = 0;
        this.minutes = 0;
        this.video = video;
    }

    setTime(time) {
        this.seconds = Math.floor(time%60);
        this.minutes = Math.floor(time/60);
    }

    DisplayTime(display) {
        this.setTime(this.video.currentTime);
        if (this.seconds >= 10)
            display.innerHTML = this.minutes + ":" + this.seconds;
        else {
            display.innerHTML = this.minutes + ":0" + this.seconds;
        }
    }
}

/**********************************************************
 *                 Variable Declaration                   *
 **********************************************************/

var player = new Controller(document.getElementById("theVideo"));
var timer = new Timer(document.getElementById("theVideo"));

/**********************************************************
 *                     Event Listeners                    *
 **********************************************************/

 // purpose?
document.getElementById("playPause").addEventListener("click", function() {player.toggle()});
// purpose?
timer.video.addEventListener("timeupdate", function(){timer.DisplayTime(document.getElementsByClassName("currentTime")[0])});
