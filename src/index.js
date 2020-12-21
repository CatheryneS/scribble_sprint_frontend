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