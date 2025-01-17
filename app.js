//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("main__new_task");//Add a new task.
var addButton=document.getElementById("button__add");//first button
var incompleteTaskHolder=document.getElementById("main__tasks_incomplete");//ul of #main__tasks_incomplete
var completedTasksHolder=document.getElementById("main__tasks_completed");//main__tasks_completed


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className="input__task input__lable";

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="input__checkbox";
    editInput.type="text";
    editInput.className="input__task input__text input__hidden";
    listItem.className="main__list";


    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="button button__edit";

    deleteButton.className="button button__delete";
    deleteButtonImg.src="./remove.svg";
    deleteButton.appendChild(deleteButtonImg);
    deleteButtonImg.className="button__delete_image ";

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #main__new_task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log('Change "edit" to "save"');


    var listItem=this.parentNode;

    var editInput=listItem.querySelector("input.input__task");
    var label=listItem.querySelector(".input__task");
    var editBtn=listItem.querySelector(".button__edit");
    var containsClass=listItem.classList.contains("main__task_edit");

    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }
    label.classList.toggle("lable__hidden");
    //toggle .editmode on the parent.
    listItem.classList.toggle("main__task_edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #main__tasks_completed
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    var label=listItem.querySelector(".input__lable");
    label.classList.toggle("label__cross");

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
 
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #main__tasks_incomplete.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    var label=listItem.querySelector(".input__lable");
    label.classList.toggle("label__cross");

}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".input__checkbox");
    var editButton=taskListItem.querySelector(".button__edit");
    var deleteButton=taskListItem.querySelector(".button__delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.