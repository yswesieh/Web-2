let tasks = [];
let currentFilter = "all";

const addTask = () => {
    let input = document.getElementById("taskInput");
    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter task name");
        return;
    }

    let task = {
        id: Date.now(),
        tiele: taskName,
        completed: false,
    }

    tasks.push(task);

    input.value = "";
    displayTasks();
}

const displayTasks = () => {
    let filteredTasks = tasks.filter((task) => {
        if (currentFilter === "completed") {
            return task.completed === true;
        }
        if (currentFilter === "pending") {
            return task.completed === false;
        }
        return true;
    })

    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach((task) => {
        let li = document.createElement("li");
        let span = document.createElement("span");

        span.textContent = task.tiele;

        if (task.completed) {
            span.classList.add("completed");
        }

        let completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => {
            toggleTask(task.id)
        }

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
            deleteTask(task.id)
        }

        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
    let taskCount = document.getElementById("taskCount");
    taskCount.textContent = tasks.length;
}

const toggleTask = (id) => {
    let task = tasks.find((task) => {
        return task.id === id;
    });


    if (task) {
        task.completed = !task.completed;
    }
    displayTasks();
}

const deleteTask = (id) => {
    tasks = tasks.filter(task => {
        return task.id !== id;
    });

    displayTasks();
}

const filterTasks = (filter) => {
    currentFilter = filter;
    displayTasks();
}
