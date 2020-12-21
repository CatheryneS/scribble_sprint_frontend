class Notebook {
    constructor(id, notebookAttr) {
        this.id = id
        this.name = notebookAttr.name
        this.stories = notebookAttr.stories
    }

    createNotebook(){
        const row = document.getElementById('notebooks');
        const column = document.createElement('section');
        const card = document.createElement('section');
        const h4Tag = document.createElement('h4');
        const btn = document.createElement('button');
    
        column.className = 'notebook-container';
        card.className = 'notebook-card';
        card.dataset.id = `${this.id}`;
        card.addEventListener('click', app.openNotebook.bind(this));
        h4Tag.innerText = `${this.name}`;
        btn.innerText = "View All Stories Inside";
        btn.addEventListener('click', app.hideNotebooks.bind(this));
    
        card.appendChild(h4Tag);
        row.appendChild(column);
        column.appendChild(card);
        column.appendChild(btn);
    }

    createIndex(story) {
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
    }; 
};