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
    const prompt = document.getElementById('prompt');
    const story = document.getElementById('story');

    intro.style.display = "none";
    row.style.display = "none";
    prompt.style.display = "block";
    story.style.display = "block";

    showTimer();
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
    .then(obj => renderStory(obj));
}

function renderStory(storyObj) {
    const prompt = document.getElementById('prompt');
    const storySect = document.getElementById('story');
    const timer = document.getElementById('timer');
    const form = document.getElementById('story-form');
    const h1Tag = document.createElement('h1');
    const pTag = document.createElement('p');

    prompt.remove();
    timer.remove();
    form.remove();

    h1Tag.className = "story-title";
    pTag.className = "story-content";

    h1Tag.innerText = storyObj.data.attributes.title;
    pTag.innerText = storyObj.data.attributes.content;

    storySect.appendChild(h1Tag);
    storySect.appendChild(pTag);
    
}