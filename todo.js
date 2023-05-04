const itemsArray=localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):[];/* local storage configuration*/

/* date display */
function displayDate(){
    const date= new Date();
    const newDate= date.toString().split(" ");
    document.querySelector(".date").innerHTML=newDate[0] + " " + newDate[1] + " " + newDate[2];
}
/* storing the user input task to local storage and itemsArray*/
document.querySelector(".enter").addEventListener("click", ()=>{
const item=document.querySelector(".item").value
if(!item){
    alert("please write a todo-task");
}else{
    createItem(item);
}

})
function createItem(item){
    itemsArray.push(item);
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload();
}

/* displaying the user input task alongside with the html element */
function displayItems(){
    let items=""; 
    for(let i=0; i <itemsArray.length; i++){
        items+=`<div class="todo-items">
        <div class="input-controller">
            <textarea ="text" class="textarea" disabled> ${itemsArray[i]}</textarea>
            <div class="eidt-controller">
                <i class="fa-solid fa-trash deleteBtn"></i>
                <i class="fa-solid fa-pen-to-square editBtn" ></i></div>
    
        
        </div>
        <div class="update-controller">
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        </div>
    </div>`  
    }
    /* activating the delete, edit, save & cancel button */
    document.querySelector(".to-do-list").innerHTML=items;
    activateDeleteListner()
    activateEditListner()
    activateSavelistner()
    activateCancellistner()
}

function activateDeleteListner(){
    let deleteBtn=document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((btn, i)=>{
        btn.addEventListener("click", ()=>{deleteItem(i)})
    })
}
function deleteItem(i){
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload();
}
function activateEditListner(){
    const editBtn=document.querySelectorAll(".editBtn")
    const update_controller=document.querySelectorAll(".update-controller");
    const text_inputs=document.querySelectorAll(".input-controller textarea");
    console.log(editBtn);
    editBtn.forEach((btn, i)=>{
        btn.addEventListener("click", () =>{
            update_controller[i].style.display= "block";
            text_inputs[i].disabled=false;
        })
    })
    
};

function activateSavelistner(){
    const saveBtn=document.querySelectorAll(".saveBtn");
    const text_inputs=document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((save, i)=>{
        save.addEventListener("click", ()=>{
            update(text_inputs[i].value, i);
        })
    }) 

}
function update(text, i){
    itemsArray[i]=text;
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
};
function activateCancellistner(){
    const cancelBtn=document.querySelectorAll(".cancelBtn");
    const update_controller=document.querySelectorAll(".update-controller");
    const text_inputs=document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cancel, i)=>{
        cancel.addEventListener("click", ()=>{
            update_controller[i].style.display="none";
            text_inputs[i].disabled=true;
        })
    })
}


window.addEventListener("load", ()=>{
    displayDate();
    displayItems();
})
console.log(itemsArray);
