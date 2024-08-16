const textBox = document.getElementById("text-box");
const items = document.getElementById("items");
const dark = document.getElementById("dark");
const back = document.getElementById("back");

//Function for adding item to to-do list.
function addItem() {
    if (textBox.value === '') {
        return;
    } else {
        let li = document.createElement("li");
        li.innerHTML = textBox.value;
        addEventListeners(li);
        items.appendChild(li);
        saveData();
    }
    textBox.value = "";
}

//Event listeners for checking-off and removing items. 
function addEventListeners(li) {
    li.addEventListener('click', () => {
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
            li.style.color = "black";
        } else {
            li.style.textDecoration = "line-through";
            li.style.color = "red";
        }
        saveData();
    });
    li.addEventListener('contextmenu', ()=>{
        event.preventDefault();
        items.removeChild(li);
        saveData();
    });
}

//Allow 'enter' key to add item to list. 
textBox.addEventListener('keypress', ()=>{
    if(event.key === 'Enter'){
        addItem();
    }
})

//Light/Dark mode button.
dark.addEventListener('click', ()=>{
    if(dark.innerHTML == "Dark"){
        back.style.background = "black";
        dark.innerHTML = "Light";
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
    else{
        back.style.background = "radial-gradient(circle, rgb(255, 100, 134), rgba(255, 255, 255, 0.74))";
        dark.innerHTML = "Dark";
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
    

})

//Functions for local storage.
function saveData(){
    localStorage.setItem("data", items.innerHTML);
}
function loadData(){
    items.innerHTML = localStorage.getItem("data");
    items.querySelectorAll('li').forEach(li => {
        addEventListeners(li);
    })
}

loadData();
