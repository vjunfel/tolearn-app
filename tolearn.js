// MODEL SECTION --------------------------------------------------------
// If localstorage has a todos array, then use it
// Otherwise use the default array.
// let todos;
let todos = [{title: "Ex: Javascript", dueDate: "July 30, 2022", id: "id1"}];

// Retrieve localStorage
const savedList = JSON.parse(localStorage.getItem("toLearnItems"));
// Check if it's an array
if (Array.isArray(savedList)) {
  todos = savedList;
} else {
  //   let todos = "wala lang";
  let todos = [{title: "Ex: Python", dueDate: "July 30, 2022", id: "id1"}];
}

// Creates a toLearn list
function inputValue(inputText, inputDate) {
  const id = "" + new Date().getTime();
  //This will get the value of textbox and date input.
  todos.push({
    title: inputText,
    dueDate: inputDate,
    id: id,
  });
  saveToLearn();
}

// Deletes a toLearn list
function removeSelected(idToDelete) {
  todos = todos.filter(function (obj) {
    if (obj.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });

  saveToLearn();
}

function saveToLearn() {
  localStorage.setItem("toLearnItems", JSON.stringify(todos));
}

// function update() {}

// CONTROLLER SECTION --------------------------------------------------------
// Adding value to array
function addToLearn() {
  if (document.getElementById("input-Id").value.length === 0) {
    alert("Pls add things to learn");
  } else {
    const textbox = document.getElementById("input-Id");
    const inputText = textbox.value;

    const datePicker = document.getElementById("date-picker");
    const inputDate = datePicker.value;

    inputValue(inputText, inputDate);
    render();
  }
}

function deleteToLearn(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;
  removeSelected(idToDelete);
  render();
}

// function completeList() {
//   const completeButton = event.target;
//   const idComplete = completeButton.id;
// }

function complete(event) {
  document.createElement("completed-list").innerHTML = "";
  const compList = document.getElementById("completed-list");

  const com1 = event.target;
  const idComplete = com1.id;
  completeList();

  deleteToLearn();
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;
  removeSelected(idToDelete);

  bookList.appendChild(element);

  render();
}

// VIEW SECTION --------------------------------------------------------
//Add input value and add into array and display on a page
function render() {
  // reset our list
  document.getElementById("toLearn-list").innerHTML = "";

  todos.forEach((todo) => {
    const element = document.createElement("div");
    element.innerText = todo.title + " " + todo.dueDate;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Remove";
    deleteButton.style = "margin: 0.5em 1em";
    deleteButton.onclick = deleteToLearn;
    deleteButton.id = todo.id;

    const completeButton = document.createElement("button");
    completeButton.innerText = "Complete";
    completeButton.style = "margin: 0.5em 1em";
    completeButton.className = "completeBtn";
    // completeButton.onclick = complete;
    // completeButton.id = obj.id;

    const toLearnList = document.getElementById("toLearn-list");

    element.appendChild(deleteButton);
    element.appendChild(completeButton);
    toLearnList.appendChild(element);
  });
}

render();
