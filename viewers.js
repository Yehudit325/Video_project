
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC1y7DP2Q96s1JMjioinJW6MyI5RViP06g",
    authDomain: "pagecounters.firebaseapp.com",
    databaseURL: "https://pagecounters.firebaseio.com",
    projectId: "pagecounters",
    storageBucket: "",
    messagingSenderId: "242879235950"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
// const dbRef = firebase.database();
//
// const viewsRef = dbRef.ref("viewer")
// var views= document.getElementsByClassName("views")[0];
//
//
// viewsRef.once('value').then(function(snapshot) {
//     if (!snapshot.exists()) {
//         //first call - initialize database
//         setNewViewsinDB(0);
//         incrementViews(0);
//     }
//     else
//     {
//         incrementViews(snapshot.val().numViews);
//     }
// });
//
// function incrementViews(curValue) {
//   var newValue = curValue + 1;
//   views.innerHTML = newValue;
//   setNewViewsinDB(newValue);
// }
//
// function setNewViewsinDB(value) {
//   viewsRef.set({
//     numViews: value
//   });
// }

////////////////////////////////////////////////////////////////////////////////////////////////////

// let upCount = 0;
// let downCount = 0;
//
// const thumbsRef = dbRef.ref("thumbs")
//
// thumbsRef.on('value', function(snapshot) {
//   if (snapshot.val() && snapshot.val().upCount) {
//     upCount = snapshot.val().upCount;
//   }
//   if (snapshot.val() && snapshot.val().downCount) {
//     downCount = snapshot.val().downCount;
//   }
//
//   renderCounter();
// });
//
//
// function renderCounter() {
//     document.getElementById("thumbsUp").innerHTML = "thumbsUp: " + upCount;
//     document.getElementById("thumbsDown").innerHTML = "thumbsDown: " + downCount;
// }
//
// document.getElementById("thumbsUp").addEventListener("click", updateUpCount);
// document.getElementById("thumbsDown").addEventListener("click", updateDownCount);
//
// function updateUpCount() {
//     upCount++;
//     updateCounter();
// }
//
// function updateDownCount() {
//     downCount++;
//     updateCounter();
// }
//
// function updateCounter() {
//     thumbsRef.set({
//         upCount: upCount,
//         downCount: downCount
//     })
//
//     renderCounter();
// }


class Counter {
    // Create a variable to reference the database
    // dbRef = firebase.database();
    // subRef;
    // display;

    constructor() {
        this.dbRef = firebase.database();
        this.counter = 0;
    }

    initializeDB() {
        this.subRef.set({
          counter: this.counter
        });
    }

    incrementCounter() {
        this.counter++;
    }

    renderDisplay() {
        this.display.innerHTML = this.counter;
    }

    updateDB() {
        this.subRef.update({
        counter: this.counter
      });
    }
}

class Viewer extends Counter {
    constructor() {
        super();
        this.display = document.getElementsByClassName("views")[0];
        this.subRef = this.dbRef.ref("viewer")

        this.subRef.once('value').then(function(snapshot) {
            if (!snapshot.exists()) {
                //first call - initialize database
                this.initializeDB();
            }
            else
            {
                this.incrementCounter();
                this.renderDisplay();
                this.updateDB();
            }
        });
    }
    //override
    initializeDB() {
      this.subRef.set({
        viewCount: 0
      });
      this.incrementCounter();
    }

    //override
    updateDB() {
        this.subRef.update({
          viewCount: this.counter
        });
    }
}

class ThumbsUp extends Counter {
    constructor() {
        super();
        this.display = document.getElementById("thumbsUp").childNodes[1];
        this.subRef = this.dbRef.ref("thumbs");

        this.subRef.on('value', function(snapshot) {
          if (snapshot.val() && snapshot.val().upCount) {
            this.counter = snapshot.val().upCount;
          }
          else
          {
              this.initializeDB();
          }

          this.renderDisplay();
        });

        document.getElementById("thumbsUp").addEventListener("click", function(){
            this.incrementCounter();
            this.updateDB();
            this.renderDisplay();
        });
    }

    //override
    initializeDB() {
      this.subRef.set({
        upCount: 0,
        downCount: 0
      });
      this.incrementCounter();
    }

    //override
    updateDB() {
        this.subRef.update({
          upCount: this.counter
        });
    }
}

class ThumbsDown extends Counter {
    constructor() {
        super();
        this.display = document.getElementById("thumbsDown").childNodes[1];
        this.subRef = this.dbRef.ref("thumbs");

        this.subRef.on('value', function(snapshot) {
          if (snapshot.val() && snapshot.val().downCount) {
            this.counter = snapshot.val().downCount;
          }
          else
          {
              this.initializeDB();
          }

          this.renderDisplay();
        });

        document.getElementById("thumbsDown").addEventListener("click", function(){
            this.incrementCounter();
            this.updateDB();
            this.renderDisplay();
        });
    }

    //override
    initializeDB() {
      this.subRef.set({
        upCount: 0,
        downCount: 0
      });
      this.incrementCounter();
    }

    //override
    updateDB() {
        this.subRef.update({
          DownCount: this.counter
        });
    }
}

var viewCount = new Viewer();
// var upCount = ThumbsUp();
// var downCount = ThumbsDown();
