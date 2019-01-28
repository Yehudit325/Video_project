/**********************************************************
 *                 Variable Declarations                  *
 **********************************************************/

// Initialize Firebase - From firebase site
  var config = {
    apiKey: "AIzaSyC1y7DP2Q96s1JMjioinJW6MyI5RViP06g",
    authDomain: "pagecounters.firebaseapp.com",
    databaseURL: "https://pagecounters.firebaseio.com",
    projectId: "pagecounters",
    storageBucket: "pagecounters.appspot.com",
    messagingSenderId: "242879235950"
  };
  firebase.initializeApp(config);

// Create a variable to reference the firebase database
const dbRef = firebase.database();

// Create a reference to the 'viewer' object in database
const viewsRef = dbRef.ref("viewer")

/**********************************************************
 *                        Functions                       *
 **********************************************************/

 /* FireBase 'once' function
  * Read the 'viewer' data once from data base, receives a snapshot that
  * contains the data at the 'viewer' location in the database when called.
  * The function updates the current view counts and displays it.
  */
viewsRef.once('value').then(function(snapshot) {
    if (!snapshot.exists()) {
        // First call - initialize 'viewer' object in database
        initializeViewer();
    }
    handleViews(snapshot.val().numViews);
});

function handleViews(curValue) {
    //recevies the current view count value fron the database
  let newValue = curValue + 1; //increments view count
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
}
