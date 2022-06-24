
const _ = (name) => document.querySelector(name);
const __ = (name) => document.createElement(name);
const btn = _('button');
const input = _('#input');
const search = _('#textbox')
const list = _('.here');

const log = _('#log');

btn.addEventListener('click', () => {

    storeItem(input.value);
    renderVeiws(itemStore);

})
    
let itemStore = [];

function storeItem(itemValue) {
    let obj = {
        name: itemValue,
        done: false
    }
    itemStore.unshift(obj);
    localStorage.setItem('itemStore', JSON.stringify(itemStore));
    console.log('store-item', itemStore)
}
function renderVeiws(itemArray = []) {
    console.log('render-views', itemStore)
    list.innerHTML = '';


    itemArray.forEach((item, i) => {
        input.value = '';

        const editItem = __('button');
        const markItem = __('button');
        const delItem = __('button');
        const listItem = __('span');
        const itemList = __('p');

        const setActive = (markItemColor='', listItemColor='') => {
            markItem.style.color =   markItemColor;
            listItem.style.color = listItemColor;
        }
        itemList.appendChild(listItem);
        listItem.textContent = item.name;
        itemList.appendChild(delItem);
        delItem.textContent = 'delete';
        itemList.appendChild(markItem);
        markItem.textContent = 'mark';
        itemList.appendChild(editItem);
        editItem.textContent = 'edit';

        if(item.done) {
            setActive('green', 'red')
        }
        list.appendChild(itemList);

        editItem.addEventListener('click', () => {

            if (editItem.style.backgroundColor === '') {
                listItem.setAttribute('contentEditable', true);
                editItem.setAttribute('class', 'grey');
                editItem.textContent = 'save';
                editItem.style.backgroundColor = 'grey';
            } else {
                listItem.setAttribute('contentEditable', false);
                editItem.setAttribute('class', 'white');
                editItem.textContent = 'edit';
                editItem.style.backgroundColor = '';
                itemStore[i].name = listItem.textContent;
                localStorage.setItem('itemStore', JSON.stringify(itemStore));
            }
        })
        delItem.addEventListener('click', (e) => {
            itemStore.splice(i, 1);
            localStorage.setItem('itemStore', JSON.stringify(itemStore));
            renderVeiws(itemStore);
        })

        
        markItem.addEventListener('click', () => {
            
            if (itemStore[i].done == false) {
                itemStore[i].done = true;
                setActive('green', 'red')
            } else {
                itemStore[i].done = false;
                setActive();
                
            }
            localStorage.setItem('itemStore', JSON.stringify(itemStore));
            console.log('mark-item', itemStore)
        })
    })

    if (itemArray.length == 0) {
        list.innerHTML = 'Item not found';
    }
}

search.addEventListener('keyup', (e) => {

    if (e.keyCode == 13) {
        if (e.target.value == 'latest'|| e.target.value == 'earliest') {
            itemStore.reverse();
            renderVeiws(itemStore);
            return
        }
        if (e.target.value == 'done') {
            const anotherRender= itemStore.filter(function (store) {
                return store.done;
            })
            renderVeiws(anotherRender);
            return
        }
            const newRender = itemStore.filter(function (store) {
                return store.name == e.target.value;
            })
            renderVeiws(newRender);
            return
            
    }
    renderVeiws(itemStore)

});
const lStorage = localStorage.getItem('itemStore');
console.log('storage', lStorage)
if(lStorage) {
    const red = JSON.parse(lStorage);
   
    if(red && Array.isArray(red) && red.length) {
        itemStore = red;
        console.log('red', red)
        renderVeiws(red);
    }    
}
 

