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
if (month < 10) {
  month = '0'+month
}
const newDate = today.getFullYear() +'-'+ month +'-'+today.getDate();
console.log(newDate);
console.log(dueDate.value);

document.getElementById('currentDate').innerHTML = today.toDateString();
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
  // Task Name field validation
  if (tName.value ==="" || tName.value.length < 8) {  
    document.getElementById('errMsg').innerText="Task Name cannot be empty and not less than 8 chars";  
    document.getElementById('errMsg').style.color = "#ff0000";
     tName.focus();
     nameFlag = true;
     
  } else {
    document.getElementById('errMsg').hidden=true;
    assignedTo.focus();
    nameFlag=false;
    
  }

  //assigned to field validation
  if (assignedTo.value ==="" || assignedTo.value.length < 8) {  
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

//Adding task to the array and displaying tasks to the browser on click

let myTasks = [];
let id = 0;
let i=0;

//const isValidity = validateTaskForm();
//console.log('testing',isValidity);

submitButton.addEventListener('click', () => {
   
  if(!(validateTaskForm())) {

     alert('provide valid input');
     
  }  else {
    
    id++;
    myTasks.push(new TaskManager(id,taskName.value,assignedTo.value,dueDate.value,statusButton.value,description.value ));
  
  for(; i< myTasks.length;i++)
  {
    //creating card elements
    let card = document.createElement("div")
    let cardHeading = document.createElement("h3")
    let cardId= document.createElement("h5")
    let cardContent=document.createElement("p")
    let createdDate = document.createElement("span")
    let editButton = document.createElement('button')
    let deleteButton = document.createElement('button')
    //assigned class names for styling in css
    card.className = 'cards';
    editButton.className = "taskButtons";
    deleteButton.className = "taskButtons";
    createdDate.className = "cardDate"
    //Task card content
    cardHeading.innerHTML= "Task Details"
    cardId.innerHTML ="Task Id: "+id;
    cardContent.innerHTML =`Task Name: ${myTasks[i].taskName} <br/> Assigned To: ${myTasks[i].assignedTo} <br/>Due Date: ${myTasks[i].dueDate} <br/> Description: ${myTasks[i].description} <br/> Status: ${statusButton.value}`;
    createdDate.innerHTML = `Created on: ${today.toDateString()}`;
    editButton.innerHTML = `Edit`;
    deleteButton.innerHTML =`Delete`;
    //card styles
    cardHeading.style.background = "yellow";
    cardContent.style.marginLeft = '10px';
    cardId.style.marginLeft = '10px';
    //appending to parent element
    document.body.append(card);
    card.append(cardHeading,cardId,cardContent);
    cardContent.append(deleteButton,editButton)
    cardHeading.appendChild(createdDate);

    reset();
  }
  }
});


  
  