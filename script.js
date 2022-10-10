const input = document.getElementById("addInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

// update the whole list when browser refreshed or new item is added
function update(){
    if(localStorage.getItem("myItems") == null){
        myItemsArray = [];
        localStorage.setItem("myItems", JSON.stringify(myItemsArray));
    }

    else{
        myItemsArray = JSON.parse(localStorage.getItem("myItems"));
    }

    let html = "";
    myItemsArray.forEach((element, index) => {

        html += `
                <li class="d-flex">
                    <textarea readonly>${element}</textarea>
                    <div class="buttons">
                        <button class="btn btn-dark btn1" onclick="editItem(${index})"></button>
                        <button class="btn btn-dark btn2" onclick="saveItem(${index})"></button>
                        <button class="btn btn-dark btn3" onclick="deleteItem(${index})"></button>
                    </div>
                </li>`;
    });
    
    todoList.innerHTML = html;

    Array.from(document.getElementsByTagName("textarea")).forEach( (ta) =>{
        ta.style.height = "40px";
        ta.style.height = (ta.scrollHeight) + "px";
    });
}

update();

// /// Add an item
function addItem(){
    if(input.value.trim() == ""){
        alert("Please enter some text before adding a task");
    }

    else{
        myItemsArray = JSON.parse(localStorage.getItem("myItems"));
        myItemsArray.push(input.value.trim());
        localStorage.setItem("myItems", JSON.stringify(myItemsArray));
        update();
    }

    input.value = "";
    input.focus();
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});

// delete all items
function clearAll(){
    if(confirm("Do you really want to clear all Items")){
        localStorage.clear();
        update();
    }
}

// edit an item
function editItem(itemIndex){
    textArea = todoList.children[itemIndex].children[0];
    textArea.readOnly = false;
    textArea.focus();
}

// save an item
function saveItem(itemIndex){
    textArea = todoList.children[itemIndex].children[0];
    textArea.readOnly = true;

    myItemsArray = JSON.parse(localStorage.getItem("myItems"));
    myItemsArray.splice(itemIndex, 1, textArea.value.trim());

    localStorage.setItem("myItems", JSON.stringify(myItemsArray));
    update();
}

// //// delete an item 
function deleteItem(itemIndex){
    myItemsArray = JSON.parse(localStorage.getItem("myItems"));
    myItemsArray.splice(itemIndex, 1);

    localStorage.setItem("myItems", JSON.stringify(myItemsArray));
    update();
}
    
