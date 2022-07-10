let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
const search = document.querySelector(".search input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();

  // let today = new Date();

  // screenLeft dd = String(today.getDate()).padStart(2, "0");

  // let month = today.toLocaleString("default", { month: "long" });

  // let yyyy = today.getFullYear();

  // let min = today.getMinutes();
  // let day = today.toLocaleString("en-us", { weekday: "long" });
  // let sec = today.getMinutes();
  // let hr = today.getHours();

  today =
    day + "," + " " + dd + " " + month + " " + yyyy + "," + hr + ":" + sec;
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const task = document.querySelector("#tasks");

  const cur_time = document.createElement("div");

  cur_time.classList.add("time");

  const current_time = document.createElement("h5");

  current_time.innerHTML = today;

  cur_time.appendChild(current_time);

  tasks.appendChild(cur_time);
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

const filterTasks = (term) => {
  console.log(term);
  Array.from(tasks.children)
    .filter((task) => !task.textContent.toLowerCase().includes(term))
    .forEach((task) => task.classList.add("filtered"));

  Array.from(tasks.children)
    .filter((task) => task.textContent.toLowerCase().includes(term))
    .forEach((task) => task.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTasks(term);
});
