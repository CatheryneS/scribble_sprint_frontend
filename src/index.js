const BASEURL = "http://localhost:3000/api/v1/"
const NOTEBOOKURL = BASEURL + "notebooks"
const PROMPTURL = BASEURL + "prompts"
const STORYURL = BASEURL + "stories"

const app = new App();

const start = 1;
let time = start * 60;


function renderStoryPage(storyObj) {
    const prompt = document.getElementById('prompt');
    const storySect = document.getElementById('story');
    const timer = document.getElementById('timer');
    const form = document.getElementById('story-form');
    const h1Tag = document.createElement('h1');
    const pTag = document.createElement('p');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');

    if (prompt && timer && form) {
        prompt.remove();
        timer.remove();
        form.remove();
    } else {
        document.getElementById('notebook-index').style.display = "none";
        let title = document.getElementsByClassName('Titles');

        while(title[0]) {
            title[0].parentNode.removeChild(title[0]);
        }
        storySect.style.display = "block";
    }

    h1Tag.className = "story-title";
    pTag.className = "story-content";
    btn1.dataset.id = `${storyObj.data.attributes.prompt.notebook_id}`;
    btn1.innerText = "View all stories";
    btn1.addEventListener('click', e => {
        removeStory();
        getStories(storyObj.data.attributes.prompt.notebook_id);
    });
    btn2.innerText = "Pick another notebook";
    btn2.addEventListener('click', e => {
        removeStory();
        showNotebooks();
    });


    h1Tag.innerText = storyObj.data.attributes.title;
    pTag.innerText = storyObj.data.attributes.content;

    storySect.appendChild(h1Tag);
    storySect.appendChild(pTag);
    storySect.appendChild(btn1);
    storySect.appendChild(btn2);
}

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
    .then(obj => renderStoryPage(obj))
}

function showNotebooks() {
    const intro = document.getElementById('intro');
    const row = document.getElementById('notebooks');
    const story = document.getElementById('story');

    intro.style.display = "block";
    row.style.display = "block";
    story.style.display = "none";
}