//getting DOM elements
let form = document.getElementById('inputForm');
let tName = document.getElementById("taskName");
let assignedTo = document.getElementById("assignedTo");
let dueDate = document.getElementById("dueDate");
let statusButton = document.getElementById("statusButton");
let statusDropDown = document.getElementById("statusDropDown");
let description = document.getElementById("description");

let submitButton = document.getElementById('submitButton');

//Displaying Date

let today = new Date();
let month = today.getMonth()+1;

function addLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}
const newDate = today.getFullYear() +'-'+ addLeadingZeros (month, 2) +'-'+addLeadingZeros(today.getDate(), 2);
console.log(newDate);
console.log(dueDate.value);

document.getElementById('currentDate').innerHTML = `Date:${today.toDateString()}`;
document.getElementById('currentDate').style.color = 'dark grey';
document.getElementById('currentDate').style.fontWeight ='bold';


//validating fields by firing pointOver event on the form
let nameFlag =false;
let assignedToFlag = false;
let dueDateFlag =false;
let statusFlag = false;
let descriptionFlag =false;
form.onpointerover = validateTaskForm;


//validating the form
function validateTaskForm() {
  //console.log('did i come here --' +tName.value.length)

  // Task Name field validation
  if ( tName.value ==="" || tName.value.length < 8) {  
    document.getElementById('errMsg').hidden=false;
    document.getElementById('errMsg').innerText="Task Name cannot be empty and not less than 8 chars";  
    document.getElementById('errMsg').style.color = "#ff0000";
     tName.focus();
     nameFlag = true;
     console.log('did i come here nameee')

  } else {
    document.getElementById('errMsg').hidden=true;
    assignedTo.focus();
    nameFlag=false;
    
  }

  //assigned to field validation
  if (assignedTo.value ==="" || assignedTo.value.length < 8) {  
    document.getElementById('errMsg1').hidden=false;
    document.getElementById('errMsg1').innerText="Assigned to Name cannot be empty and not less than 8 chars";  
    document.getElementById('errMsg1').style.color = "#ff0000";
    assignedTo.focus(); 
    assignedToFlag = true;
  } else {
    document.getElementById('errMsg1').hidden=true;
    dueDate.focus();
    assignedToFlag=false;
  }
    
  //due date validation
      
  if (dueDate.value < newDate) {  
    document.getElementById('errMsg2').hidden=false;
    document.getElementById('errMsg2').innerText="Select date greater than or equal to today's date";  
    document.getElementById('errMsg2').style.color = "#ff0000";
    dueDate.focus(); 
    dueDateFlag = true;
  } else {
    document.getElementById('errMsg2').hidden=true;
    statusButton.focus();
    dueDateFlag=false;
  }
      
  //status validation
        
  if (statusButton.value == "--select--") {  
    document.getElementById('errMsg3').hidden=false;
    document.getElementById('errMsg3').innerText="Select a valid status";  
    document.getElementById('errMsg3').style.color = "#ff0000";
    statusButton.focus();
    statusFlag = true;
  } else {
    document.getElementById('errMsg3').hidden=true;
    description.focus();
    statusFlag=false;
  }

  //description validation
  if (description.value =="" || description.value.length < 15) {  
    document.getElementById('errMsg4').hidden=false;
    document.getElementById('errMsg4').innerText="Description should not be empty and greater than 15 chars";  
    document.getElementById('errMsg4').style.color = "#ff0000";
    description.focus();
    descriptionFlag = true;
  } else {
    document.getElementById('errMsg4').hidden=true;
    descriptionFlag=false;
  }  
   
  //console.log(nameFlag,assignedToFlag,dueDateFlag,descriptionFlag,statusFlag);
  
  //console.log(!(nameFlag),!(descriptionFlag));

  if (!(nameFlag) && !(descriptionFlag) && !(assignedToFlag) && !(dueDateFlag) && !(statusFlag)){
    return true;
  }

       
}


//reset button functionality

  function reset() {
  tName.value= "";
  assignedTo.value = "";
  dueDate.value = "";
  description.value ="";
  statusButton.value = "--select--";
  }
  
  
//Task 6 creating class and object

const TaskManager = class {
  constructor(id ,taskName,assignedTo,dueDate,statusButton,description) {
    this.id = id;
    this.taskName= taskName;
    this.assignedTo = assignedTo;
    this.dueDate= dueDate;
    this.statusButton = statusButton;
    this.description = description;
  }

};

//function to add tasks to the loacal storage
 function addTask(task) {
  
  let arr = JSON.parse(localStorage.getItem("tasks")) || [];
  arr.push(task);
  localStorage.setItem("tasks",JSON.stringify(arr));
  console.log(arr);
}
 

//Adding task to the array and displaying tasks to the browser on click

let myTasks = [];
let id = 0;
let i=0;

//Adding tasks to the local storage and displaying tasks simultaneously on click of submit button

submitButton.addEventListener('click', () => {
  
  if(!(validateTaskForm())) {

     alert('provide valid input');
     
  }  else {
    if(localStorage.getItem('tasks')){
      JSON.parse(localStorage.getItem('tasks')).forEach(element =>{
        id = element.id;   
      })
     }
    id++;
    myTasks.push(new TaskManager(id, taskName.value, assignedTo.value, dueDate.value, statusButton.value, description.value ));
    console.log(myTasks);

    for(; i< myTasks.length;i++){
    createTaskHTML(myTasks[i]);
    addTask(myTasks[i]);
    reset();
    }
  }
});
    
//creating a card element to display on to the browser
  function createTaskHTML(task)
  {
  
    //creating card elements
    let card = document.createElement("div")
    let cardHeading = document.createElement("h3")
    let cardId= document.createElement("h5")
    let cardContent=document.createElement("p")
    let statusContent=document.createElement("span")
    let createdDate = document.createElement("span")
    let doneButton = document.createElement('button')
    let deleteButton = document.createElement('button')
    let editButton = document.createElement('button')
    
    //assigned class names for styling in css
    card.className = 'cards';
    doneButton.className = "taskButtons";
    deleteButton.className = "taskButtons";
    editButton.className = "taskButtons";
    createdDate.className = "cardDate"
    //create unique id's for the done buttons on each card
    let doneBtn = `${task.id}_doneBtn`
    let delBtn = `${task.id}_delBtn`
    let edtBtn = `${task.id}_edtBtn`
    // assign the id's to the button
    doneButton.setAttribute('id', doneBtn);
    deleteButton.setAttribute('id', delBtn);
    editButton.setAttribute('id', edtBtn);
        
    //Task card content
    cardHeading.innerHTML= "Task Details"
    cardId.innerHTML ="Task Id: "+ task.id;
    cardContent.innerHTML =`Task Name: ${task.taskName} <br/> Assigned To: ${task.assignedTo} <br/>Due Date: ${task.dueDate} <br/> Description: ${task.description}<br/>`;
    statusContent.innerHTML = `<b>Status: ${task.statusButton}</b><br/>`;
    createdDate.innerHTML = `Created on <i class="fa fa-calendar"></i> : ${today.toDateString()}`;
    
    //card styles
      //function to display different background colors based on the status  
      function statusColor() {
        if(task.statusButton ==="To-Do"){
          statusContent.style.color ="crimson";
        }else if(task.statusButton === "In progress"){
          statusContent.style.color ="orange";
        } else if(task.statusButton === "Review"){
          statusContent.style.color ="gold";
        } else {
           statusContent.style.color ="green";
         }
      }

      // cardHeading.style.background = "#009ACD";
      cardHeading.style.background = "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,83,121,1) 0%, rgba(0,212,255,1) 100%)"; // gradient added
      cardHeading.style.color = "white";
      cardContent.style.marginLeft = '10px';
      cardId.style.marginLeft = '10px';
      doneButton.innerHTML = "<button type= 'button' class= 'btn btn-success'>Done</button>";
      deleteButton.innerHTML = "<button type= 'button' class= 'btn btn-danger'>Delete</button>";
      editButton.innerHTML = "<button type= 'button' class= 'btn btn-primary'>Edit</button>";
      cardHeading.style.paddingLeft = "10px"  //padding added

      //display the status content color when creating the card.
      statusColor();
    
    //appending to parent element
    document.body.append(card);
    card.append(cardHeading,cardId,cardContent);
    cardContent.append(deleteButton,doneButton,editButton,statusContent)
    cardHeading.appendChild(createdDate);

    //calling the edit task function on edit button click
    document.getElementById(`${edtBtn}`).addEventListener('click',()=>{
      editTask(task.id);
      statusColor();     
    });    
   
    //calling the update task function on done button click
    document.getElementById(`${doneBtn}`).addEventListener('click',()=> {
        updateTask(task.id)
        statusColor();
    });
    //to disappear the done button once the status is done
    if((task.statusButton)==="Done") {
      document.getElementById(`${doneBtn}`).style.display = 'none';
    }

    // calling the delete task function on delete button click
    document.getElementById(`${delBtn}`).addEventListener('click',()=>{
        deleteTask(task.id)
       
    });
    
  }
  
  
  //Updating tasks takes id as argument

function updateTask(id){
    
    let itemFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];
    let index = itemFromStorage.findIndex((task)=> task.id===id);
    if(itemFromStorage[index].statusButton ==="Review"){
    itemFromStorage[index].statusButton = "Done";
    localStorage.setItem("tasks",JSON.stringify(itemFromStorage));
    }
    location.reload();

    
}

//function to edit the status of the tasks
function editTask(id) {

  let arr1 = JSON.parse(localStorage.getItem('tasks')) || [];
  let index = arr1.findIndex((task)=> task.id===id);
  if(arr1[index].statusButton ==="In progress") {
    arr1[index].statusButton = "Review";
    localStorage.setItem("tasks",JSON.stringify(arr1));
  } else if(arr1[index].statusButton ==="To-Do") {
    arr1[index].statusButton = "In progress";
  localStorage.setItem("tasks",JSON.stringify(arr1));
  } 
  location.reload();
}


//function to display tasks on reload of the page

function displayTasks() {
    
  if(localStorage.getItem('tasks')){
    let itemFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];
      console.log(itemFromStorage);
    
    for(let c=0; c < itemFromStorage.length;c++){
        createTaskHTML(itemFromStorage[c]);
     }
    } 
        
}



//function for deleting the task on click of the delete button

function deleteTask(id) {
   let arr = JSON.parse(localStorage.getItem("tasks")) || [];
   let index = arr.findIndex((task)=> task.id===id);
    arr.splice(index,1);
  localStorage.setItem("tasks",JSON.stringify(arr));
  location.reload();
 }

 
  
 
  