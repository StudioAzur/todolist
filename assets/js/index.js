import { saveInLocalstorage } from "./localStorage.js";
// Récupérer les élements du DOM
let newTask = document.querySelector("#new_task");
let reset = document.getElementById("reset");
let taskList = document.querySelector("#task_list");
let form = document.querySelector("form");

// On créer notre liste de tâche vide
let list = [];

// On ajoute un évenement au submit du bouton
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addToDo(event.target.new_task.value);
  newTask.value = null;
});

// On ajoute une tâche à notre liste
const addToDo = (value) => {
  if (value != "") {
    list.push({ nom: value });
    displayList({ nom: value });
    saveInLocalstorage(list);
  } else {
    alert("Il faut ajouter une tâche, ça suffit la procrastination ! :)");
  }
};
// On met à jour notre liste
const updateList = () => {
  list.forEach((value) => {
    displayList(value);
  });
};

// On affiche notre liste
function displayList(value) {
  let li = document.createElement("li");
  li.innerText = value.nom;
  taskList.appendChild(li);
}

// On vide notre liste 
reset.addEventListener("click", (event)=>{
  event.preventDefault();
  list = [];
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  window.localStorage.removeItem("todo");
  updateList();
})

// Au chargement de la page
window.addEventListener("load", () => {
  list = JSON.parse(localStorage.getItem('todo')) || [];
  updateList();
});
