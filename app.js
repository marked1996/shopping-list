const form = document.getElementById('grocery-form');
const formInput = document.getElementById('grocery-input');
const list = document.querySelector('#list');
const clearBtn = document.getElementById('clear');

function addItem(e){
    e.preventDefault();
    const newItem = formInput.value.trim();
    
    if(newItem.length > 1){
        generateItem(newItem);
    } else {
        alert('Please add an item');
        return;
    }
    form.reset();
}


function generateItem(newItem){
    const htmlItem = `<li class="list-item">${newItem}<span class="delete-item">Delete</span></li>`;
    list.innerHTML += htmlItem;
};

function deleteItem(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('delete-item')){
        e.target.parentElement.remove();
    }
}

function clearItems(){
    list.innerHTML = '';
}

//Event listeners
form.addEventListener('submit', addItem);
list.addEventListener('click', deleteItem);
clearBtn.addEventListener('click', clearItems);