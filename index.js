const BASEURL = "http://localhost:3000/api/v1/"
const NOTEBOOKURL = BASEURL + "notebooks"
const PROMPTURL = BASEURL + "prompts"
const STORYURL = BASEURL + "stories"

function getNotebooks(){
    fetch(NOTEBOOKURL)
    .then(resp => resp.json())
    .then(notebooks => {notebooks.data.forEach(notebook => {
        let newNotebook = new Notebook(notebook.id, notebook.attributes);
        // debugger
        createNotebook(notebook)
    })})
}

getNotebooks()

function createNotebook(notebook){
    const row = document.getElementById('notebooks');
    const column = document.createElement('section');
    const card = document.createElement('section');
    const h4Tag = document.createElement('h4');
    const btn = document.createElement('button');

    column.className = 'notebook';
    card.className = 'card';
    card.dataset.id = `${notebook.id}`;
    card.addEventListener('click', openNotebook);
    h4Tag.innerText = `${notebook.attributes.name}`;
    btn.innerText = "View All Stories Inside";
    btn.addEventListener('click', readNotebook);

    card.appendChild(h4Tag);
    row.appendChild(column);
    column.appendChild(card);
    column.appendChild(btn);
}

function openNotebook(selection) {
    const intro = document.getElementById('intro');
    const row = document.getElementById('notebooks');
    const prompt = document.getElementById('prompt');
    const story = document.getElementById('story');

    intro.style.display = "none";
    row.style.display = "none";
    prompt.style.display = "block";
    story.style.display = "block";

    showTimer();
    grabPrompt(selection.target.parentElement.dataset.id);
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

    createStoryForm(prompt);
}

function createStoryForm(prompt) {
    const section = document.getElementById('story');
    const form = document.createElement('form');
    const text = document.createElement('textarea');
    const label = document.createElement('label')
    const title = document.createElement('input');
    const btn = document.createElement('button');

    form.dataset.id = `${prompt.data.id}`;
    form.id = "story-form";
    title.id = "Title";
    title.type = "text";
    text.id = "story-area";
    btn.innerText = "Save";
    btn.type = "submit";
    form.addEventListener('submit', saveStory);

    section.appendChild(form);
    form.appendChild(label);
    form.appendChild(title);
    form.appendChild(text);
    form.appendChild(btn);
}

function showTimer() {
    const section = document.getElementById('story');
    const timer = document.createElement('h2');

    timer.id = "timer";

    section.appendChild(timer);
    startTimer = setInterval(updateTimer, 1000);
}

const start = 10;
let time = start * 60;

function updateTimer() {
    const timer = document.getElementById('timer');
    if (timer){
        const mins = Math.floor(time/60);
        let secs = time % 60;

        secs = secs < 10 ? '0' + secs : secs;

        timer.innerHTML = `${mins}:${secs}`;
        time--;

        if (secs == 0 && mins == 0) {
            clearInterval(startTimer);
            timer.innerHTML = "Time's Up!"
        }
    }
}

function saveStory(e){
    e.preventDefault();
    fetch(STORYURL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            title: e.target.children[1].value,
            content: e.target.children[2].value,
            prompt_id: e.target.dataset.id
        })
    })
    .then(resp => resp.json())
    .then(obj => renderStoryPage(obj));
}

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