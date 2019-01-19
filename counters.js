
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC1y7DP2Q96s1JMjioinJW6MyI5RViP06g",
    authDomain: "pagecounters.firebaseapp.com",
    databaseURL: "https://pagecounters.firebaseio.com",
    projectId: "pagecounters",
    storageBucket: "pagecounters.appspot.com",
    messagingSenderId: "242879235950"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
const dbRef = firebase.database();

// Create a reference to the viewer node in database
const viewsRef = dbRef.ref("viewer")

viewsRef.once('value').then(function(snapshot) {
    if (!snapshot.exists()) {
        // First call - initialize database
        initializeViewer();
    }
    else
    {
        handleViews(snapshot.val().numViews);
    }
});

function handleViews(curValue) {
  let newValue = curValue + 1;
  renderDisplay(newValue);
  updateViewer(newValue);
}

function renderDisplay(value) {
    document.getElementsByClassName("views")[0].innerHTML = value;
}

function updateViewer(value) {
  viewsRef.update({
    numViews: value
  });
}

function initializeViewer() {
  viewsRef.set({
    numViews: 0
  });

  handleViews(0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

let upCount = 0;
let downCount = 0;

const thumbsRef = dbRef.ref("thumbs")

document.getElementById("thumbsUp").addEventListener("click", handleThumbsUp);
document.getElementById("thumbsDown").addEventListener("click", handleThumbsDown);

thumbsRef.on('value', function(snapshot) {
    if (!snapshot.exists()) {
        // First call - initialize database
        initializeThumbs();
    }
    upCount = snapshot.val().upCount;
    downCount = snapshot.val().downCount;

    renderCounter();
});

function initializeThumbs() {
    thumbsRef.set({
        upCount: 0,
        downCount: 0
    })
}

function handleThumbsUp() {
    upCount++;
    thumbsRef.update({
        upCount: upCount
    })

    disableClick();
}

function handleThumbsDown() {
    downCount++;
    thumbsRef.update({
        downCount: downCount
    })

    disableClick();
}

function renderCounter() {
    document.getElementById("thumbsUp").innerHTML = "thumbsUp: " + upCount;
    document.getElementById("thumbsDown").innerHTML = "thumbsDown: " + downCount;
}

// Remove event listners after one button click - each user can only like or dislike once
function disableClick() {
    document.getElementById("thumbsUp").removeEventListener("click", handleThumbsUp);
    document.getElementById("thumbsDown").removeEventListener("click", handleThumbsDown);
}
