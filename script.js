// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load dark mode
let darkMode = localStorage.getItem("darkMode") === "true";

// Elements
const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const dueDate = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const themeBtn = document.getElementById("themeBtn");

// Apply dark mode
if (darkMode) {
    document.body.classList.add("dark");
}

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update progress
function updateProgress() {

    let completed = tasks.filter(task => task.completed).length;

    let percent = tasks.length === 0
        ? 0
        : (completed / tasks.length) * 100;

    progressBar.style.width = percent + "%";

    progressText.innerText =
        `${completed} of ${tasks.length} Completed`;
}

// Render tasks
function renderTasks() {

    taskList.innerHTML = "";

    let keyword = search.value.toLowerCase();

    tasks
    .filter(task =>
        task.text.toLowerCase().includes(keyword)
    )
    .forEach((task, index) => {

        const li = document.createElement("li");

        li.className =
            task.completed ? "task completed" : "task";

        li.innerHTML = `

        <div class="task-left">

            <h3>${task.text}</h3>

            <p>
            ${task.category}
            •
            ${task.date || "No Date"}
            </p>

        </div>

        <div class="task-right">

            <button class="completeBtn">
            ✔
            </button>

            <button class="editBtn">
            ✏
            </button>

            <button class="deleteBtn">
            🗑
            </button>

        </div>

        `;

        // Complete Task
        li.querySelector(".completeBtn").onclick = () => {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        };

        // Delete Task
        li.querySelector(".deleteBtn").onclick = () => {

            if(confirm("Delete this task?")){

                tasks.splice(index,1);

                saveTasks();

                renderTasks();

            }

        };

        taskList.appendChild(li);

    });

    updateProgress();

}

// Add Task
function addTask(){

    let text = taskInput.value.trim();

    if(text===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:text,

        category:category.value,

        date:dueDate.value,

        completed:false

    });

    taskInput.value="";

    dueDate.value="";

    saveTasks();

    renderTasks();

}

// Search
search.addEventListener("keyup", renderTasks);

// Initial Load
renderTasks();

function editTask(index){

    let newTask = prompt("Edit Task", tasks[index].text);

    if(newTask !== null){

        newTask = newTask.trim();

        if(newTask !== ""){

            tasks[index].text = newTask;

            saveTasks();

            renderTasks();

        }

    }

}


// Override renderTasks

function renderTasks(){

    taskList.innerHTML = "";

    let keyword = search.value.toLowerCase();

    let completed = 0;

    tasks.forEach((task,index)=>{

        if(
            !task.text.toLowerCase().includes(keyword)
        ){
            return;
        }

        if(task.completed){
            completed++;
        }

        let li = document.createElement("li");

        li.className = task.completed
            ? "task completed"
            : "task";

        li.innerHTML = `

        <div class="task-left">

            <h3>${task.text}</h3>

            <p>
            ${task.category}
            •
            ${task.date || "No Due Date"}
            </p>

        </div>

        <div class="task-right">

            <button class="completeBtn">
            <i class="fa-solid fa-check"></i>
            </button>

            <button class="editBtn">
            <i class="fa-solid fa-pen"></i>
            </button>

            <button class="deleteBtn">
            <i class="fa-solid fa-trash"></i>
            </button>

        </div>

        `;

        // Complete
        li.querySelector(".completeBtn").onclick=()=>{

            tasks[index].completed =
            !tasks[index].completed;

            saveTasks();

            renderTasks();

        };

        // Delete
        li.querySelector(".deleteBtn").onclick=()=>{

            if(confirm("Delete this task?")){

                tasks.splice(index,1);

                saveTasks();

                renderTasks();

            }

        };

        // Edit
        li.querySelector(".editBtn").onclick=()=>{

            editTask(index);

        };

        taskList.appendChild(li);

    });

    let percent =
    tasks.length==0
    ?0
    :(completed/tasks.length)*100;

    progressBar.style.width =
    percent+"%";

    progressText.innerHTML =
    `${completed} of ${tasks.length} Completed`;

}


// Dark Mode


themeBtn.onclick=()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "darkMode",

        document.body.classList.contains("dark")

    );

};

taskInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        addTask();
    }
}) 
  

renderTasks();
