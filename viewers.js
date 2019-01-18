
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCzifoLjvZnRWrp4bV5a5iULa_y0QE47k",
  authDomain: "veiwercounter.firebaseapp.com",
  databaseURL: "https://veiwercounter.firebaseio.com",
  projectId: "veiwercounter",
  storageBucket: "veiwercounter.appspot.com",
  messagingSenderId: "1037034955499"
};
firebase.initializeApp(config);

// Create a variable to reference the database
const dbRef = firebase.database();

const viewsRef = dbRef.ref("viewer")
var views= document.getElementsByClassName("views")[0];


viewsRef.once('value').then(function(snapshot) {
    if (!snapshot.exists()) {
        //first call - initialize database
        setNewViewsinDB(0);
        incrementViews(0);
    }
    else
    {
        incrementViews(snapshot.val().numViews);
    }
});

function incrementViews(curValue) {
  var newValue = curValue + 1;
  views.innerHTML = newValue;
  setNewViewsinDB(newValue);
}

function setNewViewsinDB(value) {
  viewsRef.set({
    numViews: value
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////

let upCount = 0;
let downCount = 0;


const thumbsRef = dbRef.ref("thumbs")

thumbsRef.on('value', function(snapshot) {
  if (snapshot.val() && snapshot.val().upCount) {
    upCount = snapshot.val().upCount;
  }
  if (snapshot.val() && snapshot.val().downCount) {
    downCount = snapshot.val().downCount;
  }

  renderCounter();
});


function renderCounter() {
    document.getElementById("thumbsUp").innerHTML = "thumbsUp: " + upCount;
    document.getElementById("thumbsDown").innerHTML = "thumbsDown: " + downCount;
}

document.getElementById("thumbsUp").addEventListener("click", updateUpCount);
document.getElementById("thumbsDown").addEventListener("click", updateDownCount);

function updateUpCount() {
    upCount++;
    updateCounter();
}

function updateDownCount() {
    downCount++;
    updateCounter();
}

function updateCounter() {
    thumbsRef.set({
        upCount: upCount,
        downCount: downCount
    })

    renderCounter();
}
