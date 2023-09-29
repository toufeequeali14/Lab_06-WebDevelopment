// Get references to HTML elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load todos from localStorage
const todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render todos on the page
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <button data-index="${index}">Remove</button>
        `;
        todoList.appendChild(li);

        // Add event listener to mark as completed
        li.querySelector("span").addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        // Add event listener to remove todo
        li.querySelector("button").addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
    });
}

// Add new todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text !== "") {
        todos.push({ text, completed: false });
        saveTodos();
        todoInput.value = "";
        renderTodos();
    }
});

// Initial rendering of todos
renderTodos();
