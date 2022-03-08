import '../scss/main.scss';

// Getting elements
let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let inputdesc = document.getElementById('inputdesc');
let inputdate = document.getElementById('inputdate');
let inputtime = document.getElementById('inputtime');

//getting the json file path
const personsURI = 'persons.json';
//const personsURI = 'data/persons.json';
//creating new request 
const personsXHR = new XMLHttpRequest();
//opening the xhr request object
personsXHR.open('GET', personsURI);
let countchild1 = 0;

// Addig event listner to ADD button
addToDoButton.addEventListener('click', function(){
    
    var paragraph = document.createElement('button');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = inputField.value;
    //append the data
    document.body.appendChild(paragraph);
    //create a new dic for todo desctiption, date and time fields
    let content = document.createElement("div");
        content.classList.add('tpdiv');
        console.log("Inside event listener")
        console.log(content);
        content.style.visibility = 'hidden';
        content.innerText = inputdesc.value + " " + inputdate.value + " " + inputtime.value;
        paragraph.appendChild(content);
    //make new button to remove the todo
    let ckremove = document.createElement("button");
    ckremove.innerText = 'remove: '+ inputField.value;
    document.body.appendChild(ckremove);
    //make new button to mark the todo
    let ckdone = document.createElement("button");
    ckdone.innerText = 'Mark: ' + inputField.value;
    document.body.appendChild(ckdone);
    //event listener on mark button to set visibility of the todo
    ckdone.addEventListener("click", function() {
        if(paragraph.style.visibility === 'hidden'){
            paragraph.style.visibility = 'visible';
        }else{
            paragraph.style.visibility = 'hidden';
        }
        if(ckremove.style.visibility === 'hidden'){
            ckremove.style.visibility = 'visible';
        }else{
            ckremove.style.visibility = 'hidden';
        }
    })
    //event listner on todo to hide/unhide the desc, date and time
    paragraph.addEventListener("click", function() {
        this.classList.toggle("active");
        if(content.style.visibility === 'hidden'){
        content.style.visibility = 'visible';
        }else{
            content.style.visibility = 'hidden';
        }
    })
    //event lisner on remove to remove the todo and its corressponding buttons
    ckremove.addEventListener("click", function() {
        paragraph.remove();
        ckdone.remove();
        this.remove();
    });

    //resetting the input fields
    inputField.value = "";
    inputdesc.value = "";

})
// XHR onload function - calls load
personsXHR.onload = function (){
    if(this.status === 200){
        const responseText = this.responseText;
        const person = JSON.parse(responseText);
        load(person);
    }

};
//XHR send21
personsXHR.send();

/** 
 * adds person as the list item to the parent
 * @param {*} person the person object
 * @param {*} parent  the parent element
 */

/**
 * 
 * @param {*} person 
 */
const load = (person) => {
    const collsend = document.getElementsByClassName('collapsible');
    person.forEach(person => {
        createColl(person, collsend);
    });
    return true;
};

const createColl = (person, parent) => {
    console.log(person);
    let coll = document.createElement("button");
    coll.innerText = `${person.title}`;
    document.body.appendChild(coll);
    // making div for desc, date, and time
    let content = document.createElement("div");
        content.classList.add('tpdiv');
        console.log("Inside event listener")
        console.log(content);
        content.style.visibility = 'hidden';
        content.innerText = `${person.description} ${person.date} ${person.time}`; 
        coll.appendChild(content);

    //event listner on todo    
    coll.addEventListener("click", function() {
        this.classList.toggle("active");
        if(content.style.visibility === 'hidden'){
        content.style.visibility = 'visible';
        }else{
            content.style.visibility = 'hidden';
        }
    })
    //creating remove button
    let ckremove = document.createElement("button");
    ckremove.innerText = 'remove: '+ `${person.title}`;
    document.body.appendChild(ckremove);
    //creating mark button
    let ckdone = document.createElement("button");
    ckdone.innerText = 'Mark : ' + `${person.title}`;
    document.body.appendChild(ckdone);
    // mark todo logic, to set visibility
    ckdone.addEventListener("click", function() {
        if(coll.style.visibility === 'hidden' || ckremove.style.visibility === 'hidden'){
            coll.style.visibility = 'visible';
            ckremove.style.visibility = 'visible';
        }else{
            coll.style.visibility = 'hidden';
            ckremove.style.visibility = 'hidden';
        }
    })
    // add remove todo logic
    ckremove.addEventListener("click", function() {
        coll.remove();
        ckdone.remove();
        this.remove();
    });

};
