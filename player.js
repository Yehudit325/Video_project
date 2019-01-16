class PlayPause {
    constructor() {
        this.play = true; //assumed autoplay
        this.video = document.getElementById("theVideo");
    }

    playVid() {
      this.video.play();
    }

    pauseVid() {
      this.video.pause();
    }

    toggle() {
        if (this.play === true) {
            this.pauseVid();
            this.play = false;
        }
        else if (this.play === false) {
            this.playVid();
            this.play = true;
        }
    }

}

var player = new PlayPause();

document.getElementById("playPause").addEventListener("click", function () {player.toggle()});
