/**********************************************************
 *                   Classes Declarations                 *
 **********************************************************/

/* Class Controller
 * The Controller is responsible for the play/pause functionalities.
 */
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

/* Class Timer
 * The Timer is responsible for handiling the displayed time.
 */
class Timer {
    constructor(video) {
        this.seconds = 0;
        this.minutes = 0;
        this.video = video;
    }

    setTime(time) {
        //time is received in seconds and milliseconds
        //this function converts the time received to secinds and minutes
        this.seconds = Math.floor(time%60);
        this.minutes = Math.floor(time/60);
    }

    displayTime(display) {
        this.setTime(this.video.currentTime);
        if (this.seconds >= 10)
            display.innerHTML = this.minutes + ":" + this.seconds;
        else {
            display.innerHTML = this.minutes + ":0" + this.seconds;
        }
    }
}

/**********************************************************
 *                 Variable Declarations                  *
 **********************************************************/

const player = new Controller(document.getElementById("theVideo"));
const timer = new Timer(document.getElementById("theVideo"));

/**********************************************************
 *                     Event Listeners                    *
 **********************************************************/

 /* playPause - click event listener
  * Play/Pause event listener uses the player Controller to toggle
  * between 'play' and 'pause' states.
  */
document.getElementById("playPause").addEventListener("click", function() {player.toggle()});

/* timeupdate - event listener
 * Time update event listener uses the Timer to display and set the timer.
 */
timer.video.addEventListener("timeupdate", function(){timer.displayTime(document.getElementsByClassName("currentTime")[0])});
