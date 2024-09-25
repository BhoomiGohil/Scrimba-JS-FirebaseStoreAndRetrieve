import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-514f2-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

////////////////////////////////////////////////////////////////////////////////////////////////

// const moviesInDB = ref(database, "movies");
// const inputFieldEl = document.getElementById("input-field");
// const addButtonEl = document.getElementById("add-button");

// addButtonEl.addEventListener("click", function () {
//   let inputValue = inputFieldEl.value;
//   push(moviesInDB, inputValue);
//   console.log(`${inputValue} added to database`);
// });

////////////////////////////////////////////////////////////////////////////////////////////////

// const booksInDB = ref(database, "books");
// const booksEl = document.getElementById("books");

// onValue(booksInDB, function (snapshot) {
//   let booksArray = Object.values(snapshot.val());
//   clearBooksListEl();

//   for (let i = 0; i < booksArray.length; i++) {
//     let currentBook = booksArray[i];
//     appendItemToBooksListEl(currentBook);
//   }
// });

// function clearBooksListEl() {
//   booksEl.innerHTML = "";
// }

// function appendItemToBooksListEl(bookValue) {
//   booksEl.innerHTML += `<li> ${bookValue} </li>`;
// }

////////////////////////////////////////////////////////////////////////////////////////////////

// const newsStoriesInDB = ref(database, "newsStories");

// const storiesEl = document.getElementById("stories");

// onValue(newsStoriesInDB, function (snapshot) {
//   let newsStoriesArray = Object.entries(snapshot.val());

//   storiesEl.innerHTML = "";

//   for (let i = 0; i < newsStoriesArray.length; i++) {
//     let currentStory = newsStoriesArray[i];

//     appendStoryToStoriesEl(currentStory);
//   }
// });

// function appendStoryToStoriesEl(story) {
//   let storyID = story[0];
//   let storyTitle = story[1];

//   let newEl = document.createElement("div");

//   newEl.classList.add("story");

//   newEl.textContent = storyTitle;

//   newEl.addEventListener("dblclick", function () {
//     let exactLocationOfStoryInDB = ref(database, `newsStories/${storyID}`);

//     remove(exactLocationOfStoryInDB);
//   });

//   storiesEl.append(newEl);
// }

////////////////////////////////////////////////////////////////////////////////////////////////

// const counterEl = document.getElementById("counter");
// const clickEl = document.getElementById("click");

// let counter = 0;

// clickEl.addEventListener("click", function () {
//   counter++;

//   counterEl.textContent = counter;
// });

////////////////////////////////////////////////////////////////////////////////////////////////

const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i];
      appendItemToshoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here.";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToshoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent += itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}

////////////////////////////////////////////////////////////////////////////////////////////////
