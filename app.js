const form = document.getElementById("grocery-form");
const formInput = document.getElementById("grocery-input");
const list = document.querySelector("#list");
const clearBtn = document.getElementById("clear");
const filterSection = document.getElementById("filter");
const filterInput = document.getElementById("filter-input");
const formBtn = form.querySelector("input[type=submit]");
let isEditMode = false;

function onItemSubmit(e) {
  e.preventDefault();
  const newItem = formInput.value.trim();

  if (newItem.length >= 1) {
    addItemToDOM(newItem);
    addItemToStorage(newItem);
    //check for edit mode
    if (isEditMode) {
      const itemToEdit = list.querySelector(".edit-mode");
      removeItemFromStorage(itemToEdit.firstChild.textContent);
      itemToEdit.classList.remove(".edit-mode");
      itemToEdit.remove();
      isEditMode = false;
    }
  } else {
    alert("Please add an item");
    return;
  }
  checkUI();
  form.reset();
}

function addItemToDOM(newItem) {
  const htmlItem = `<li class="list-item">${newItem}<span class="delete-item">Delete</span></li>`;
  list.innerHTML += htmlItem;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();
  //add the new item to itemsFromStorage array then stringify it below
  itemsFromStorage.push(item);
  //convert to json string and set to ls
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  //addItemToStorage > set itemsFromStorage to this func
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  //console.log(itemsFromStorage)
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.classList.contains("delete-item")) {
    deleteItem(e.target.parentElement);
    console.log(e.target.parentElement); //<li>item<span>delete</span></li>
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  list.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });

  item.classList.add("edit-mode");
  formBtn.value = "Update item";
  console.log(item.firstChild.textContent);
  formInput.value = item.firstChild.textContent;
}

function deleteItem(item) {
  //remove item from DOM
  item.remove();

  //remove item from storage
  // ====================================================
  // PROBLEM, item.textContent ima se span v sebi (printa jajcaDelete, mlekoDelete)
  //.firstChild returns a node, from which i only need textContent to remove from storage array
  // ====================================================
  removeItemFromStorage(item.firstChild.textContent);
  //console.log(item.firstChild.textContent);
  checkUI();
}

function displayStorageItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  //filer items to remove them
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  list.innerHTML = "";
  localStorage.clear();
  checkUI();
}

//check items for the state of the app to hide filter section
function checkUI() {
  //formInput.value = '';
  const items = list.querySelectorAll("li");
  if (items.length === 0) {
    filterSection.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterSection.style.display = "block";
    clearBtn.style.display = "block";
  }
  formBtn.value = "Enter item";
  isEditMode = false;
}

function filterItems(e) {
  const text = e.currentTarget.value.toLowerCase();
  const items = list.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    //The indexOf() method returns the position of the first occurrence of a value in a string. The indexOf() method returns -1 if the value is not found
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//Initialize app
function init() {
  //Event listeners
  form.addEventListener("submit", onItemSubmit);
  list.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  filterInput.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayStorageItems);
  checkUI();
}
init();
