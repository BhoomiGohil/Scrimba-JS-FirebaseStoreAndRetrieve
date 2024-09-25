import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"; // Import Firebase app initialization
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"; // Import Firebase database functions

// Firebase configuration settings
const appSettings = {
  databaseURL: "", // Add your Firebase database URL
};

// Initialize the Firebase app with the provided settings
const app = initializeApp(appSettings);
// Get a reference to the database
const database = getDatabase(app);

// Create a reference to the "shoppingList" node in the database
const shoppingListInDB = ref(database, "shoppingList");

// Get DOM elements for input field, add button, and shopping list display
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

// Add an event listener to the "Add" button
addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value; // Get the value from the input field

  // Push the new item to the shopping list in the database
  push(shoppingListInDB, inputValue);

  // Clear the input field after adding the item
  clearInputFieldEl();
});

// Listen for changes to the shopping list in the database
onValue(shoppingListInDB, function (snapshot) {
  // Check if there are existing items in the shopping list
  if (snapshot.exists()) {
    let itemArray = Object.entries(snapshot.val()); // Convert the snapshot to an array of items

    clearShoppingListEl(); // Clear the current displayed shopping list

    // Loop through the items and append them to the shopping list display
    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i]; // Get the current item
      appendItemToshoppingListEl(currentItem); // Append the current item to the display
    }
  } else {
    // If no items exist, display a message
    shoppingListEl.innerHTML = "No items here.";
  }
});

// Function to clear the shopping list display
function clearShoppingListEl() {
  shoppingListEl.innerHTML = ""; // Set the inner HTML to an empty string
}

// Function to clear the input field
function clearInputFieldEl() {
  inputFieldEl.value = ""; // Set the input field value to an empty string
}

// Function to append a new item to the shopping list display
function appendItemToshoppingListEl(item) {
  let itemID = item[0]; // Get the item ID (key from the database)
  let itemValue = item[1]; // Get the item value (actual item)

  let newEl = document.createElement("li"); // Create a new list item element
  newEl.textContent += itemValue; // Set the text content to the item value

  // Add a click event listener to the new item to remove it from the database
  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`); // Reference to the exact item location in the database

    remove(exactLocationOfItemInDB); // Remove the item from the database
  });

  shoppingListEl.append(newEl); // Append the new item to the shopping list display
}
