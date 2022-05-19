// On va chercher les différents élements
let form = document.querySelector("form");
let taskList = document.getElementById("taskList");
let newTask = document.getElementById("newTask");
let reset = document.getElementById("reset");
let body = document.querySelector("body");
// On initialise un compteur qui fait la taille du localStorage
let compteur = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //  On crée les nouveaux élément html
  let list = document.createElement("li");
  //  Récupérer la valeur entré par l'utilisateur
  let newEntry = newTask.value;
  
  if (newEntry != "") {
    list.innerText = `Chose à faire : ${newEntry}`;
    // On stocke le résultat dans le localStorage
    window.localStorage.setItem(compteur++, newEntry);
    // On injecte nos données dans le html
    taskList.appendChild(list);
  } else {
    alert("Veuillez entrez une tâche, ça suffit la procrastination. :)");
  }

  //   On vide notre formulaire
  newTask.value = "";
});

//  On vide notre liste html et notre localStorage
reset.addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.clear();
  taskList.innerHTML = "";
});

// On va chercher les différents élements du second formulaire
let mySelectedColor = document.getElementById("color");
let checkColor = document.getElementById("checkColor");
let deleteSessionStorage = document.getElementById("delete");

// function qui retourne ma couleur sauvegardé dans mon sessionStorage
function getColor(newColor) {
  if (!newColor) {
    // On initialise une couleur si le sessionStorage est vide
    newColor = "#F0F0F0";
  } else {
    //   Sinon on récupère la valeur stockéé
    newColor = window.sessionStorage.getItem("myColor");
    return newColor;
  }
}
// On change le background du body après avoir choisi sa couleur
mySelectedColor.addEventListener("change", () => {
  newColor = mySelectedColor.value;
  body.style.setProperty("background-color", newColor);
  window.sessionStorage.setItem("myColor", newColor);
});

// On écoute notre évenement sur notre bouton de suprression du sessionStorage
deleteSessionStorage.addEventListener("click", () => {
  window.sessionStorage.clear();
});
// Au chargement de la page :
window.onload = (event) => {
  // On récupère notre couleur stocké dans sessionStorage
  let newColor = window.sessionStorage.getItem("myColor");
  getColor(newColor);
  //   On change la couleur si une couleur est sauvegardé dans le sessionStorage
  body.style.setProperty("background-color", newColor);
  //   On vérifie si notre checkbox est coché
  if (checkColor.checked) {
    window.sessionStorage.setItem("myColor", newColor);
  }
};
