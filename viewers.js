
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


const viewsRef = firebase.database().ref("viewer")
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
