export function saveInLocalstorage(list){
    window.localStorage.setItem('todo', JSON.stringify(list));
}
