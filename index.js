const BASEURL = "http://localhost:3000/api/v1/"
const NOTEBOOKURL = BASEURL + "notebooks"
const PROMPTURL = BASEURL + "prompts"
const STORYURL = BASEURL + "stories"

function getNotebooks(){
    fetch(NOTEBOOKURL)
    .then(resp => resp.json())
    .then(notebooks => notebooks.data.forEach(createNotebook))
}

getNotebooks()

function createNotebook(notebook){
    const row = document.getElementById('notebooks');
    const column = document.createElement('section');
    const card = document.createElement('section');
    const h4Tag = document.createElement('h4');

    column.className = 'column';
    card.className = 'card';
    card.id = `${notebook.id}`;
    card.addEventListener('click', openNotebook);
    h4Tag.innerText = `${notebook.attributes.name}`;

    card.appendChild(h4Tag);
    row.appendChild(column);
    column.appendChild(card);
}

function openNotebook(selection) {
    const intro = document.getElementById('intro');
    const row = document.getElementById('notebooks');

    intro.style.display = "none";
    row.style.display = "none";

    grabPrompt(selection.target.parentElement.id);
}

function grabPrompt(notebookSelected) {
    fetch(PROMPTURL + "/" + notebookSelected)
    .then(resp => resp.json())
    .then(prompt => showPrompt(prompt))
}

function showPrompt(prompt) {
    const section = document.getElementById('prompt')
    const card = document.createElement('section');
    const h2Tag = document.createElement('h2');

    card.className = 'prompt-description';
    h2Tag.innerText = `${prompt.data.attributes.description}`;

    section.appendChild(card);
    card.appendChild(h2Tag);
}