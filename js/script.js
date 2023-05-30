const form = document.getElementById("novoItem");
const list = document.getElementById("lista");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach((element) => {
    queryElement(element);
});

form.addEventListener("submit", (event) => receiveElement(event))

function receiveElement(event) {
    event.preventDefault();

    var name = event.target.elements["nome"];
    var amount = event.target.elements["quantidade"];

    const exists = items.find(element => element.nome == name.value);

    const currentItem = {
        "nome": name.value,
        "quantidade": amount.value
    }

    checkElementId(exists, currentItem);
    updateLocalStorage();
    resetFormulary(name, amount);
}

function addElement(item) {
    item.id = items[items.length - 1] ? (items[items.length - 1]).id + 1 : 0;
    queryElement(item)
    items.push(item);
}

function updateElement(item, exists) {
    item.id = exists.id;
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
    items[items.findIndex(element => element.id === exists.id)] = item;
}

function deleteElement(botao, id) {
    botao.remove();
    items.splice(items.findIndex(element => element.id === id), 1);
    updateLocalStorage();
}

function queryElement(item) {
    const newItem = document.createElement('li');
    newItem.classList.add("item");

    const newDiv = document.createElement('div');
    newDiv.classList.add("content");

    const itemNumber = document.createElement('strong');
    itemNumber.innerHTML = item.quantidade;
    itemNumber.dataset.id = item.id;

    newDiv.appendChild(itemNumber);
    newDiv.innerHTML += item.nome;

    newItem.appendChild(newDiv);
    newItem.appendChild(deleteButton(item.id));
    
    list.appendChild(newItem);
}

function deleteButton(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function () {
        deleteElement(this.parentNode, id);
    })
    
    return elementoBotao
}

function updateLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
}

function checkElementId(exists, item) {
    if (exists) {
        updateElement(item, exists);
    } else {
        addElement(item)
    }
}

function resetFormulary(name, amount) {
    name.value = "";
    amount.value = "";
}