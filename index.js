let tasks = [];
let currentFilter = "all";

const displayTasks = () => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";


    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") {
            return task.completed === true;
        } else if (currentFilter === "pending") {
            return task.completed === false;
        } else {
            return true;
        }
    })


    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.title;
        if (task.completed) {
            span.classList.add("completed");
        }

        const completedButton = document.createElement("button");
        completedButton.textContent = "Complete";
        completedButton.onclick = () => toggleTask(task.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(task.id);


        li.appendChild(span);
        li.appendChild(completedButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    const taskCount = document.getElementById("taskCount");
    taskCount.textContent = tasks.length;

}

const addTask = () => {
    const input = document.getElementById("taskInput");
    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        title: taskName,
        completed: false
    }
    tasks.push(task);
    displayTasks();
    input.value = "";
}

const deleteTask = (id) => {
    tasks = tasks.filter(task => {
        return task.id !== id;
    });
    displayTasks();
}

const toggleTask = (id) => {
    const task = tasks.find(task => {
        return task.id === id;
    });

    task.completed = !task.completed;
    displayTasks();
}

const filterTasks = (filter) => {
    currentFilter = filter;
    displayTasks();
}
