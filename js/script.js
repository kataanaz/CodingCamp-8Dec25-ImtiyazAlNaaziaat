/// Final Submission Imtiyaz Al Naaziaat
/// Initial empty array to hold todo items
let todo = [];

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Ganti icon
    const btn = document.querySelector(".theme-toggle");
    if (body.classList.contains("dark-mode")) {
        btn.textContent = "☀️"; // Sun for dark mode (switch to light)
    } else {
        btn.textContent = "🌙"; // Moon for light mode (switch to dark)
    }
}

function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    /// Validation to ensure both fields are filled
    if (todoInput.value === "" || todoDate.value === "") {
        alert("Please fill in both the To Do item and the date.");
    } else {
        const todoObj = {
            task: todoInput.value,
            date: todoDate.value,
            isCompleted: false // Default status: Pending
        }

        todo.push(todoObj);
        renderTodos();

        /// Clear input fields after adding
        todoInput.value = "";
        todoDate.value = "";
    }
}

/// Delete individual todo
function deleteTodo(index) {
    // Delete 1 item at 'index'
    todo.splice(index, 1);
    renderTodos();
}

/// Reset all todos
function resetTodos() {
    todo = [];
    renderTodos();
}

/// Toggle completion status
function toggleComplete(index) {
    todo[index].isCompleted = !todo[index].isCompleted;
    renderTodos();
}

/// Called when dropdown changes
function runFilter() {
    renderTodos();
}

/// Function to render todo items as Table Rows
function renderTodos() {
    const todoListBody = document.getElementById('todo-list');
    const filterValue = document.getElementById('filter-todos').value; // 'all', 'completed', 'pending'

    // Clear existing rows
    todoListBody.innerHTML = '';

    // Filter logic
    let itemsToRender = todo.map((item, index) => {
        return { ...item, originalIndex: index }; // Keep track of original index for actions
    });

    if (filterValue === 'completed') {
        itemsToRender = itemsToRender.filter(item => item.isCompleted);
    } else if (filterValue === 'pending') {
        itemsToRender = itemsToRender.filter(item => !item.isCompleted);
    }

    // Check if empty result
    if (itemsToRender.length === 0) {
        let message = "No To Do available";

        if (todo.length > 0) {
            // Data ada, tapi tertutup filter
            if (filterValue === 'pending') {
                message = "No pending tasks!";
            } else if (filterValue === 'completed') {
                message = "No completed tasks yet!";
            } else {
                message = "No tasks found";
            }
        }

        todoListBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: #666; padding: 20px;">
                    ${message}
                </td>
            </tr>`;
        return;
    }

    // Render items
    itemsToRender.forEach((item) => {
        const statusBadge = item.isCompleted
            ? '<span class="status-badge status-completed">Completed</span>'
            : '<span class="status-badge status-pending">Pending</span>';

        const btnText = item.isCompleted ? 'Undo' : 'Done';
        const btnClass = item.isCompleted ? 'btn-action btn-delete' : 'btn-action btn-complete';
        // Note: I used 'btn-delete' color style for 'Undo' just to distinguish, or kept simple.
        // Let's stick to Green for Check/Done and maybe Yellow/Gray for Undo, 
        // but for now let's just toggle button icon/text. 
        // Or simpler: Just a Check button that toggles.

        const actionHtml = `
            <button class="btn-action btn-complete" onclick="toggleComplete(${item.originalIndex})" title="Toggle Status">
                ${item.isCompleted ? 'Undo' : 'Start'} 
            </button>
            <button class="btn-action btn-delete" onclick="deleteTodo(${item.originalIndex})" title="Delete">
                Delete
            </button>
        `;

        todoListBody.innerHTML += `
        <tr>
            <td>${item.task}</td>
            <td>${item.date}</td>
            <td>${statusBadge}</td>
            <td>${actionHtml}</td>
        </tr>`;
    });
}