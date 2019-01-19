/**********************************************************
 *                 Variable Declarations                  *
 **********************************************************/

let upCount = 0;
let downCount = 0;

// Create a reference to the 'thumbs' object in database
const thumbsRef = dbRef.ref("thumbs")

/**********************************************************
 *                     Event Listeners                    *
 **********************************************************/

 /* thumbsUp - click event listener
  * Handles thumbsUp button click events.
  */
document.getElementById("thumbsUp").addEventListener("click", handleThumbsUp);

/* thumbsDown - click event listener
 * Handles thumbsDown button click events.
 */
document.getElementById("thumbsDown").addEventListener("click", handleThumbsDown);

/* FireBase 'on' function
 * Read the 'thumbs' data from data base and listen for changes.
 * The listener receives a snapshot that contains the data at the 'thumbs'
 * location in the database at the time of the event.
 * The function updates the current thumbsUp/Down counts and displays it.
 * Assumption: updates are displayed as the button is pressed in real-time.
 */
thumbsRef.on('value', function(snapshot) {
    if (!snapshot.exists()) {
        // First call - initialize 'thumbs' object in database
        initializeThumbs();
    }
    upCount = snapshot.val().upCount;
    downCount = snapshot.val().downCount;

    renderCounter();
});

/**********************************************************
 *                        Functions                       *
 **********************************************************/

function initializeThumbs() {
    thumbsRef.set({
        upCount: 0,
        downCount: 0
    })
}

/* handleThumbsUp/Down functions
 * Handles thumbsUp/Down counter when button is clicked.
 * increment counter, update database and disable the like/dislike buttons
 * Assumption: User can choose either to like or dislike one time only.
 */
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
