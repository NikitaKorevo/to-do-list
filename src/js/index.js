"use strict";

    let arrayNotes = [];
    arrayNotes = JSON.parse(localStorage.getItem('localStorageNotes'));
    if (arrayNotes == null) {
        arrayNotes = [];
    } else {
        addNote();
    }

    console.log(arrayNotes);

// Добавляем объекты(заметки) после выключения браузера. Из LocalStorage в html
function addNote(arrayNotes) {
    arrayNotes = getArrayFromLocalStorage();

    for (let index = 0; index < arrayNotes.length; index++) {    
        const li = document.createElement('li');
        const p = document.createElement('p');
        const buttonImportant = document.createElement('button');
        const buttonTrash = document.createElement('button')
        const textareaValue = arrayNotes[index].p;
        const node = document.createTextNode(textareaValue);
        const nodeForButtonImportant = document.createTextNode('MARK IMPORTANT')
        
        p.appendChild(node);
        li.appendChild(p);
        buttonImportant.appendChild(nodeForButtonImportant);
        li.appendChild(buttonImportant);
        li.appendChild(buttonTrash);

        buttonImportant.classList.add('button-important');
        buttonTrash.classList.add('button-trash');
        
        if(arrayNotes[index].isDone === true) {
            const p = li.querySelector('p');
            p.classList.toggle('line-through');
        }
        if(arrayNotes[index].isImportant === true) {
            p = li.querySelector('p');
            p.classList.toggle('important');
        }

        document.getElementById('myUl').appendChild(li);
        
    
    }
}

// Клик по клавише ADD
const buttonAdd = document.getElementById("myButtonAdd");
buttonAdd.addEventListener ("click", createObjNode, false);

// Создаем заметку в виде объекта
function createObjNode() {
    const textareaValue = document.getElementById('myTextarea').value
    const ObjNode = {
        p: textareaValue,
        isImportant: false,
        isDone: false
    }
    if (textareaValue !== '') {
        addNoteinHTML(ObjNode);
        addObjInArr(ObjNode);
    } else {
        alert('You must write something!');
    }
    
}

// Заполняем массив объектом
function addObjInArr(obj) {
    let i = arrayNotes.length;
    arrayNotes[i] = obj;
    SaveInLocalStorage();
}

// Упаковываем массив в Local Storage
function SaveInLocalStorage() {
    localStorage.setItem('localStorageNotes', JSON.stringify(arrayNotes));
    getArrayFromLocalStorage();
}

// Достаем массив из Local Storage
function getArrayFromLocalStorage() {
    arrayNotes = JSON.parse(localStorage.getItem('localStorageNotes'));
    return arrayNotes;
}

// 1 заметку встраиваем из textarea в HTML
function addNoteinHTML(ObjNode) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const buttonImportant = document.createElement('button');
    const buttonTrash = document.createElement('button')
    const nodeForButtonImportant = document.createTextNode('MARK IMPORTANT')
    const textareaValue = ObjNode.p;
    const node = document.createTextNode(textareaValue);

    p.appendChild(node);
    li.appendChild(p);
    buttonImportant.appendChild(nodeForButtonImportant);
    li.appendChild(buttonImportant);
    li.appendChild(buttonTrash);

    buttonImportant.classList.add('button-important');
    buttonTrash.classList.add('button-trash');

    document.getElementById('myUl').appendChild(li);
    document.getElementById('myTextarea').value = '';
}

const listUl = document.getElementById('myUl');
listUl.addEventListener("click",addLineThroughNode, false);

// добавляет заметке Line-Through
function addLineThroughNode(event) {
    let li = event.target.closest('li');
    let ul = document.getElementById('myUl');
    let isButtonImportant = event.target.closest('.button-important');
    let buttonImportant = li.querySelector('.button-important');
    let p ;
   
    const index = [...ul.children].indexOf(li);
    console.log(buttonImportant);
    if(li !== null && isButtonImportant === null) {
        p = li.querySelector('p');
        p.classList.toggle('line-through');
        if( arrayNotes[index].isDone == false) {
            arrayNotes[index].isDone = true;
         //   buttonImportant.style.display = "none";
        } else {
            arrayNotes[index].isDone = false;
          //  buttonImportant.style.display = "block";
        }
    }
    
    SaveInLocalStorage();
}

const buttonImportant = document.getElementById('myUl');
buttonImportant.addEventListener("click",addImportantNode, false);  

// добавляет важность заметки 
function addImportantNode(event) {
    let buttonImportant = event.target.closest('.button-important')
    let li = event.target.closest('li');
    let ul = document.getElementById('myUl');
    let p ;
    const index = [...ul.children].indexOf(li);
    if(buttonImportant !== null) {
        p = li.querySelector('p');
        p.classList.toggle('important');
        if( arrayNotes[index].isImportant == false) {
            arrayNotes[index].isImportant = true;
        } else {
            arrayNotes[index].isImportant = false;
        }
    }
    SaveInLocalStorage();
}

const buttonTrash = document.getElementById('myUl');
buttonTrash.addEventListener("click",deleteNode, false); 

// Удалить заметку
function deleteNode(event) {
    let buttonTrash = event.target.closest('.button-trash');
    let li = event.target.closest('li');
    let ul = document.getElementById('myUl');
    const index = [...ul.children].indexOf(li);
    if (buttonTrash === null) {
    } else {
       li.remove();
       arrayNotes.splice(index, 1);
       SaveInLocalStorage();
    }
}

const buttonAll = document.getElementById('myButtonAll');
const buttonActive = document.getElementById('myButtonActive');
const buttonDone = document.getElementById('myButtonDone');
const textarea = document.getElementById('myTextarea');
const NewTask = document.getElementsByClassName('main__new-task')[0];

buttonAll.addEventListener('click', showAllNotes ,false);

// Вкладка всех заметок(по умолчанию)
function showAllNotes() {
    let isButtonAllPressed = myButtonAll.classList.contains('nav__button-pressed');
    let isButtonActivePressed = myButtonActive.classList.contains('nav__button-pressed');
    let isButtonDonePressed = myButtonDone.classList.contains('nav__button-pressed'); 
    if(isButtonAllPressed === false) {
        buttonAll.classList.add('nav__button-pressed');

        if(isButtonActivePressed === true) {
            buttonActive.classList.remove('nav__button-pressed');
        }
        if(isButtonDonePressed === true) {
            buttonDone.classList.remove('nav__button-pressed');
        }
        textarea.style.display = "block";
        buttonAdd.style.display = "block";
        NewTask.style.display = "block";

        for (let index = 0; index < arrayNotes.length; index++) {
                listUl.children[index].style.display = "flex";
        }
    }
    
}

buttonActive.addEventListener('click', showActiveNotes ,false);

// Вкладка активных пометок
function showActiveNotes() {
    let isButtonAllPressed = myButtonAll.classList.contains('nav__button-pressed');
    let isButtonActivePressed = myButtonActive.classList.contains('nav__button-pressed');
    let isButtonDonePressed = myButtonDone.classList.contains('nav__button-pressed'); 
    if(isButtonActivePressed === false) {
        buttonActive.classList.add('nav__button-pressed');

        if(isButtonAllPressed === true) {
            buttonAll.classList.remove('nav__button-pressed');
        }
        if(isButtonDonePressed === true) {
            buttonDone.classList.remove('nav__button-pressed');
        }
        textarea.style.display = "block";
        buttonAdd.style.display = "block";
        NewTask.style.display = "block";

        for (let index = 0; index < arrayNotes.length; index++) {
            if(arrayNotes[index].isDone === false) {
                listUl.children[index].style.display = "flex";
            }
            if(arrayNotes[index].isDone === true) {
                listUl.children[index].style.display = "none";
            }
        }
    }
}

buttonDone.addEventListener('click', showDoneNotes ,false);

// Вкладка выполненных заметок
function showDoneNotes() {
    let isButtonAllPressed = myButtonAll.classList.contains('nav__button-pressed');
    let isButtonActivePressed = myButtonActive.classList.contains('nav__button-pressed');
    let isButtonDonePressed = myButtonDone.classList.contains('nav__button-pressed'); 
    if(isButtonDonePressed === false) {
        buttonDone.classList.add('nav__button-pressed');

        if(isButtonAllPressed === true) {
            buttonAll.classList.remove('nav__button-pressed');
        }
        if(isButtonActivePressed === true) {
            buttonActive.classList.remove('nav__button-pressed');
        }
        textarea.style.display = "none";
        buttonAdd.style.display = "none";
        NewTask.style.display = "none";

        for (let index = 0; index < arrayNotes.length; index++) {
            if(arrayNotes[index].isDone === true) {
                listUl.children[index].style.display = "flex";
            }
            if(arrayNotes[index].isDone === false) {
                listUl.children[index].style.display = "none";
            }
        }
    }
}

const inputSearch = document.getElementById('myInputSearch');
inputSearch.addEventListener('keyup', searchNodes, false)

// Поиск заметок
function searchNodes(event) {
    console.log(inputSearch.value);
    console.log(inputSearch.value.length)

    for (let index = 0; index < arrayNotes.length; index++) {
        listUl.children[index].style.display = "flex";
    }

    for (let index = 0; (index < arrayNotes.length) ; index++) {
        for (let j = 0; j < inputSearch.value.length; j++) {
            if(arrayNotes[index].p[j]  != inputSearch.value[j]) {
                listUl.children[index].style.display = "none";
            }
        }
    }
}