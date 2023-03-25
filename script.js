const selectAllButton = document.querySelector("#select-all");
const deleteAllButton = document.querySelector("#delete-all");
const todoList = document.querySelector(".todo-list");
const newTodo = document.querySelector("#new-todo");
const addTodoButton = document.querySelector("#add-todo");
const toggleAutodeleteCheckbox = document.getElementById("toggle-autodelete");


// Load saved todo items from local storage
let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

// Add saved todos to the todo list
savedTodos.forEach(todo => {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" ${todo.checked ? "checked" : ""}>
    <span class="todo-text">${todo.text}</span>
    <button class="delete">Delete</button>
  `;
  todoList.appendChild(li);
});

// Function to save todo items to local storage
function saveTodos() {
  const todos = Array.from(todoList.querySelectorAll("li"));
  const savedTodos = todos.map(todo => ({
    text: todo.querySelector(".todo-text").textContent,
    checked: todo.querySelector("input[type=checkbox]").checked
  }));
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

// Function to add a new todo item
function addTodo() {
  if (!newTodo.value) return;
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox">
    <span class="todo-text">${newTodo.value}</span>
    <button class="delete">Delete</button>
  `;
  todoList.appendChild(li);
  newTodo.value = "";
  saveTodos();
}

// Add event listener to add todo button
addTodoButton.addEventListener("click", addTodo);

// Add event listener to enter key on new todo input field
newTodo.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Function to toggle the checked state of all todo items
function selectAll() {
  const todos = Array.from(todoList.querySelectorAll("li"));
  todos.forEach(todo => {
    const checkbox = todo.querySelector("input[type=checkbox]");
    if (!checkbox.checked) {
      checkbox.checked = true;
    }
  });
  saveTodos();
}

function deleteTodoItem(todo) {
  if (!todo) return;
  todo.parentNode.removeChild(todo);
  saveTodos();
}


// Function to delete a single todo item
function deleteSingle(event) {
  if (!event.target) return;
  event.target.parentNode.remove();
  saveTodos();
}



// Function to delete all todo items
function deleteAll() {
  todoList.innerHTML = "";
  saveTodos();
}

// Function to start the autodelete timer
function startAutodeleteTimer() {
  console.log("startAutodeleteTimer called");
  autodeleteTimer = setInterval(() => {
    const todos = Array.from(todoList.querySelectorAll("li"));
    todos.forEach(todo => {
      const checkbox = todo.querySelector("input[type=checkbox]");
      if (checkbox.checked) {
        console.log("Deleting todo item");
        deleteTodoItem(todo);
      }
    });
  }, 500);
}


// Function to stop the autodelete timer
function stopAutodeleteTimer() {
  clearInterval(autodeleteTimer);
}

// Add event listeners to select all, delete all, and toggle autodelete
selectAllButton.addEventListener("click", selectAll);
deleteAllButton.addEventListener("click", deleteAll);
toggleAutodeleteCheckbox.addEventListener("change", event => {
  console.log("Checkbox state changed");
  if (event.target.checked) {
    startAutodeleteTimer();
  } else {
    stopAutodeleteTimer();
  }
});


// Add event listener to delete buttons
const deleteButtons = document.querySelectorAll(".delete");
deleteButtons.forEach(button => button.addEventListener("click", deleteSingle));


// Checkbox saving, loading
function saveState() {
  const checkboxes = document.querySelectorAll('.todo-list input[type="checkbox"]');
  const state = Array.from(checkboxes).map(checkbox => checkbox.checked);
  localStorage.setItem('checkboxState', JSON.stringify(state));
}

function loadState() {
  const state = JSON.parse(localStorage.getItem('checkboxState'));
  if (state) {
    const checkboxes = document.querySelectorAll('.todo-list input[type="checkbox"]');
    Array.from(checkboxes).forEach((checkbox, i) => {
      checkbox.checked = state[i];
    });
  }
}

document.querySelector('.todo-list').addEventListener('change', () => {
  saveState();
});

document.addEventListener('DOMContentLoaded', () => {
  loadState();
});
