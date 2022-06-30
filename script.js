//getting DOM elements
let form = document.getElementById('inputForm');
let taskName = document.getElementById("taskName");
let assignedTo = document.getElementById("assignedTo");
let dueDate = document.getElementById("dueDate");
let statusButton = document.getElementById("statusButton");
let statusDropDown = document.getElementById("statusDropDown");
let description = document.getElementById("description");

let submitButton = document.getElementById('submitButton');


let today = new Date();
console.log(today)
let month = today.getMonth()+1;
if (month < 10) {
  month = '0'+month
}
const newdate = today.getFullYear() +'-'+ month +'-'+today.getDate();
let formDate = new Date(dueDate.value);
console.log(newdate)

// let currentDate = today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear();


  //validating the form
  submitButton.onmouseover= validateTaskForm;
  function validateTaskForm() {
    // Task Name validation
  if (tName.value ==="" || tName.value.length < 8) {  
    document.getElementById('errMsg').innerText="Provide valid Task Name";  
    document.getElementById('errMsg').style.color = "#ff0000";
     tName.focus();
  } 
    //assigned to validation
    if (assignedTo.value ==="" || assignedTo.value.length < 8) {  
      document.getElementById('errMsg1').innerText="Provide valid assigned to Name";  
      document.getElementById('errMsg1').style.color = "#ff0000";
       assignedTo.focus(); 
      }
    
      //due date validation
      
      if (dueDate.value < newdate) {  
        document.getElementById('errMsg2').innerHTML="select valid due date";  
        document.getElementById('errMsg2').style.color = "#ff0000";
         dueDate.focus(); 
        }
      
        //status validation
        
        if (statusButton.value == "--select--") {  
          document.getElementById('errMsg3').innerText="select a valid status";  
          document.getElementById('errMsg3').style.color = "#ff0000";
           statusButton.focus();
        } 

        //description validation
        if (description.value =="" || description.value.length < 15) {  
          document.getElementById('errMsg4').innerText="Provide valid description";  
          document.getElementById('errMsg4').style.color = "#ff0000";
          description.focus();
        } 
  }

  //reset button functionality

  function reset() {
  taskName.value= "";
  assignedTo.value = "";
  dueDate.value = "";
  description.value ="";
  statusButton.value = "--select--";
  }
  
  //Displaying Date
  document.getElementById('currentDate').innerHTML = today.toDateString();
  document.getElementById('currentDate').style.color = 'dark grey';
  document.getElementById('currentDate').style.fontWeight ='bold';

  
//Task 6 creating class and object


let myTasks = [];

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
let id = 0;
// let saveButton = document.getElementById('submit');
let i=0;
submitButton.addEventListener('click', () => {
    if (taskName.value === ""|| assignedTo.value === "" || statusButton.value == "--select--" || description.value === "" || dueDate.value === "") {
  alert('provide valid input')
} else {
    id++;
     myTasks.push(new TaskManager(id,taskName.value,assignedTo.value,dueDate.value,statusButton.value,description.value ));
     
}  

for(; i< myTasks.length;i++)
{
  console.log(myTasks);
let card = document.createElement("div")
let cardHeading = document.createElement("h3")
let cardId= document.createElement("h5")
let cardContent=document.createElement("p")
let createdDate = document.createElement("span")
let editButton = document.createElement('button')
let deleteButton = document.createElement('button')
document.body.append(card);
card.className = 'cards';
editButton.className = "taskButtons";
deleteButton.className = "taskButtons";

cardHeading.style.background = "yellow";
cardHeading.innerHTML= "Task Details"
cardId.innerHTML ="Task Id: "+id;
cardContent.innerHTML =`Task Name: ${myTasks[i].taskName} <br/> Assigned To: ${myTasks[i].assignedTo} <br/>Due Date: ${myTasks[i].dueDate} <br/> Description: ${myTasks[i].description} <br/> Status: ${statusButton.value}`;
createdDate.innerHTML = today.toDateString();
editButton.innerHTML = "Edit";
deleteButton.innerHTML ="Delete";

createdDate.style.color = 'grey';
createdDate.style.fontSize = '12px';
createdDate.style.float = 'right';
createdDate.style.paddingTop = '5px';
cardContent.style.marginLeft = '10px';
cardId.style.marginLeft = '10px';

card.append(cardHeading,cardId,cardContent);
cardContent.append(deleteButton,editButton)
cardHeading.appendChild(createdDate);
reset();
// taskName.value= "";
// assignedTo.value = "";
// dueDate.value = "";
// description.value ="";
// statusButton.value = "--select--";
 }
 
});


  
  