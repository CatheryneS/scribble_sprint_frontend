const BASEURL = "http://localhost:3000/api/v1/"
const NOTEBOOKURL = BASEURL + "notebooks"
const PROMPTURL = BASEURL + "prompts"
const STORYURL = BASEURL + "stories"

const app = new App();

const start = 1;
let time = start * 60;

function removeStory() {
    document.getElementById('story').style.display = "none";
    document.getElementsByClassName('story-title')[0].remove();
    document.getElementsByClassName('story-content')[0].remove();
    document.querySelector("#story > button:nth-child(1)").remove();
    document.querySelector("#story > button").remove();
}

function readNotebook(notebook) {
    const intro = document.getElementById('intro');
    const row = document.getElementById('notebooks');

    intro.style.display = "none";
    row.style.display = "none";

    getStories(notebook.target.previousSibling.dataset.id);
}

function getStories(notebookId){
    fetch(NOTEBOOKURL + "/" + notebookId)
    .then(resp => resp.json())
    .then(notebook => notebook.data.attributes.stories.forEach(createIndex))
    .catch(error => {return "No stories have been written"})
}

function createIndex(story) {
    const index = document.getElementById('notebook-index');
    const ulTag = document.createElement('ul');
    const liTag = document.createElement('li');
    const btn = document.createElement('button');

    index.style.display = "block";
    ulTag.className = "Titles";
    liTag.className = "Title";
    liTag.innerText = `${story.title}`;
    btn.innerText = "Read Story";
    btn.dataset.id = `${story.id}`;
    btn.addEventListener('click', getStory);

    index.appendChild(ulTag);
    ulTag.appendChild(liTag);
    liTag.appendChild(btn);
}   

function getStory(story){
    const id = story.target.dataset.id;

    fetch(STORYURL + "/" + id)
    .then(resp => resp.json())
    .then(obj => {
        renderStoryPage(obj)})
}

function showNotebooks() {
    const intro = document.getElementById('intro');
    const row = document.getElementById('notebooks');
    const story = document.getElementById('story');

    intro.style.display = "block";
    row.style.display = "block";
    story.style.display = "none";
}