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

function showNotebooks() {
    const intro = document.getElementById('intro');
    const row = document.getElementById('notebooks');
    const story = document.getElementById('story');

    intro.style.display = "block";
    row.style.display = "block";
    story.style.display = "none";
}