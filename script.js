let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const list = document.getElementById("taskList");

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateProgress(){

let completed = tasks.filter(t=>t.done).length;

let percent = tasks.length===0 ? 0 :
Math.round(completed/tasks.length*100);

document.getElementById("bar").style.width=percent+"%";

document.getElementById("progressText").innerHTML=
percent+"% Completed";
}

function display(){

list.innerHTML="";

let keyword=document.getElementById("search").value.toLowerCase();

tasks
.filter(t=>t.text.toLowerCase().includes(keyword))
.forEach((task,index)=>{

let li=document.createElement("li");

li.innerHTML=`

<div class="info ${task.done?"completed":""}">

<b>${task.text}</b>

<span class="category">${task.category}</span>

<span class="date">${task.date}</span>

</div>

<div class="actions">

<button class="edit">✏</button>

<button class="delete">🗑</button>

</div>

`;

li.querySelector(".info").onclick=()=>{

task.done=!task.done;

save();

display();

};

li.querySelector(".delete").onclick=()=>{

tasks.splice(index,1);

save();

display();

};

li.querySelector(".edit").onclick=()=>{

let value=prompt("Edit Task",task.text);

if(value){

task.text=value;

save();

display();

}

};

list.appendChild(li);

});

updateProgress();

}

function addTask(){

let text=document.getElementById("taskInput").value.trim();

if(text=="") return;

tasks.push({

text,

category:document.getElementById("category").value,

date:document.getElementById("date").value,

done:false

});

document.getElementById("taskInput").value="";

save();

display();

}

document.getElementById("search").onkeyup=display;

document.getElementById("themeBtn").onclick=()=>{

document.body.classList.toggle("dark");

};

display();
