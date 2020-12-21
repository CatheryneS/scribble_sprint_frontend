class Story {
    constructor(story) {
        this.id = story.id
        this.title = story.attributes.title
        this.content = story.attributes.content
        this.promptId = story.attributes.prompt.id
        this.notebook_id = story.attributes.prompt.notebook_id
        this.adapter = new StoriesAdapter()
    };

    renderStoryPage() {
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
        btn1.dataset.id = this.notebook_id;
        btn1.innerText = "View all stories";
        btn1.addEventListener('click', e => {
            removeStory();
            getStories(this.notebook_id);
        });
        btn2.innerText = "Pick another notebook";
        btn2.addEventListener('click', e => {
            removeStory();
            showNotebooks();
        });
    
    
        h1Tag.innerText = this.title;
        pTag.innerText = this.content;
    
        storySect.appendChild(h1Tag);
        storySect.appendChild(pTag);
        storySect.appendChild(btn1);
        storySect.appendChild(btn2);
    }
}