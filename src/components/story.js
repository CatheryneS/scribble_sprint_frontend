class Story {
    constructor(story) {
        this.id = story.id
        this.title = story.attributes.title
        this.content = story.attributes.content
        this.promptId = story.attributes.prompt.id
        this.notebook_id = story.attributes.prompt.notebook_id
        this.adapter = new StoriesAdapter()
        this.nb_adapter = new NotebooksAdapter()
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
            document.getElementById('story-list').remove();
            storySect.style.display = "block";
        }
    
        h1Tag.className = "story-title";
        pTag.className = "story-content";
        btn1.dataset.id = this.notebook_id;
        btn1.className ="btn btn-outline-secondary";
        btn1.innerText = "View all stories";
        btn1.addEventListener('click', e => {
            this.removeStory();
            this.getStories();
        });
        btn2.innerText = "Pick another notebook";
        btn2.className = "btn btn-outline-secondary";
        btn2.addEventListener('click', e => {
            this.removeStory();
            app.showNotebooks();
        });
    
    
        h1Tag.innerText = this.title;
        pTag.innerText = this.content;
    
        storySect.appendChild(h1Tag);
        storySect.appendChild(pTag);
        storySect.appendChild(btn1);
        storySect.appendChild(btn2);
    };

    getStories() {
        this.nb_adapter.fetchAllStories(this.notebook_id)
        .then(notebook => {
            let nb = new Notebook(notebook.data.id, notebook.data.attributes);
            for (let story of nb.stories) {
                nb.createIndex(story)
            }
        })
    };

    static getStory() {
        let adapter = new StoriesAdapter()
        adapter.fetchStory(this)
        .then(story => {
            let newStory = new Story(story.data);
            newStory.renderStoryPage();
        })
    };

    removeStory() {
        document.getElementById('story').style.display = "none";
        document.getElementsByClassName('story-title')[0].remove();
        document.getElementsByClassName('story-content')[0].remove();
        document.querySelector("#story > button:nth-child(1)").remove();
        document.querySelector("#story > button").remove();
    };
}