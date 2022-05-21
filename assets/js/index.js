import { saveInLocalstorage } from "./save.js";
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
reset.addEventListener("click", (event) => {
  event.preventDefault();
  list = [];
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  window.localStorage.removeItem("todo");
  updateList();
});

// On identifie nos élements DOM
let checkColor = document.querySelector("input[type=checkbox]");
let inputColor = document.querySelector("#color");
let emptySession = document.querySelector("#delete");
// On initialise une couleur de base
let colorInit = "#f0f0f0";
// On modifie avec un sélécteur notre couleur de background
const changeColor = (color) => {
  document
    .querySelector("body")
    .setAttribute("style", `background-color:${color}`);
};

// On remplace notre couleur la checkbox est coché
checkColor.addEventListener("change", () => {
  if (checkColor.checked) {
    sessionColor(color);
  }
});

// On sauvegarde notre couleur pour la session en cours
const sessionColor = (color) => {
  sessionStorage.setItem("color", color.value);
  console.log(`color saved :  ${color.value}`);
};

// On écoute le changement de couleur sur l'input
inputColor.addEventListener("input", (event) => {
  colorInit = event.target.value;
  changeColor(colorInit);
});

// Au clique on vide les informations dans le sessionStorage
emptySession.addEventListener("click", () => {
  sessionStorage.removeItem("color");
});

// Au chargement de la page
window.addEventListener("load", () => {
  list = JSON.parse(localStorage.getItem("todo")) || [];
  colorInit = sessionStorage.getItem("color") || "#ffffff";
  changeColor(colorInit);
  updateList();
});
