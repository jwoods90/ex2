/* NOTE: Solutions will vary by student, based on additional functionality
    created in Lesson 24, Puzzle 25.
   Code added for this puzzle has been marked with comments.
*/

var favThings = [];
appendItem(favThings, "https://images.code.org/72af5e4050e957e9462cb3382ea14244-image-1449015048842.jpg");
appendItem(favThings, "https://images.code.org/87b79543de7de95c342e8c7be8850bfd-image-1449015058989.gif");
appendItem(favThings, "https://images.code.org/cbfc9ec9044684d54891e9e47dbb507d-image-1449015062315.jpg");

var currIndex = 0; // Track the index of the favorite thing currently being displayed
updateDisplay();

onEvent("nextButton", "click", function(event) {
  doNextItem();
});

onEvent("lastButton", "click", function(event) {
  doLastItem();
});

// Begin student code
onEvent("screen1", "keydown", function(event) {
  if (event.key == "Right") { // If right arrow pressed, move to next array element.
    doNextItem();
  }
  else if (event.key == "Left") { // If left arrow pressed, move to previous array element.
    doLastItem();
  }
});
// End student code

onEvent("addButton", "click", function(event) {
  var newItem = getText("userInput");
  if (newItem != "") {
    // Only add a new item if the input field isn't blank
    setText("userInput", ""); // Clear user input after processing it
    // Append new items to the end of the array, instead of in the middle
    appendItem(favThings, newItem);
    updateDisplay();
  }
});

// Add a remove button to delete items from the array.
onEvent("removeButton", "click", function(event) {
  // If the array is not empty
  if (favThings.length > 0) {
    // Only remove an element if the array isn't empty
    removeItem(favThings, currIndex);
    
    if (currIndex > (favThings.length - 1)) {
      // If the item removed was the last item, currIndex is now
      //  out of bounds, so we'll set it to the first element
      currIndex = 0;
    }
    
    // Update display
    if (favThings.length > 0) {
      // If there are still elements in the array, use the function we wrote
      updateDisplay();
    }
    else {
      // If the list is now empty, hard-code some default display settings
      setText("displayArea", "");
      setText("currentEntryLabel", "0 of 0");
    }
  }
});

// Update the screen elements to reflect changes to the global index variable.
function updateDisplay() {
  setImageURL("imageArea", favThings[currIndex]);
  setText("currentEntryLabel", (currIndex + 1) + " of " + favThings.length);
}

// Begin student code
// Move code from nextButton event handler to a separate function to remove redundancy.
function doNextItem() {
  // If the array is not empty
  if (favThings.length > 0) {
    currIndex++; // Increment the global index variable
    if (currIndex == favThings.length) {
      // If the index variable goes past the upper end of the array
      currIndex = 0; // Wrap around to the first element
    }
    updateDisplay();
  }
}

// Move code from lastButton event handler to a separate function to remove redundancy.
function doLastItem() {
  // If the array is not empty
  if (favThings.length > 0) { 
    currIndex--; // Decrement the global index variable
    if (currIndex < 0) {
      // If the index variable goes past the lower end of the array
      currIndex = favThings.length - 1; // Wrap around to the last element
    }
    updateDisplay();
  }
}
// End student code
