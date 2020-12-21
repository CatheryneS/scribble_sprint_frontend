class Notebook {
    constructor(id, notebookAttr) {
        this.id = id
        this.name = notebookAttr.name
        this.stories = notebookAttr.stories
        this.instruction = notebookAttr.instruction
        this.image = notebookAttr.image_url
    }

    createNotebook(){
        const row = document.getElementById('notebooks');
        const column = document.createElement('section');
        const card = document.createElement('section');
        const sect = document.createElement('section');
        const h4Tag = document.createElement('h4');
        const imgTag = document.createElement('img');
        const btn = document.createElement('button');

        column.className = 'col-lg-3 mb-4';
        card.className = 'card bg-dark text-white';
        card.dataset.id = `${this.id}`;
        card.addEventListener('click', app.openNotebook.bind(this));
        
        imgTag.className = "card-img";
        imgTag.src = this.image;
        sect.className = "card-img-overlay";
        h4Tag.className = "card-title";
        h4Tag.innerText = `${this.name}`;
        btn.innerText = "View All Stories Inside";
        btn.className = "btn btn-secondary"
        btn.addEventListener('click', app.hideNotebooks.bind(this));
    
        card.appendChild(imgTag);
        card.appendChild(sect);
        sect.appendChild(h4Tag);
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
        btn.className = "btn btn-info";
        btn.addEventListener('click', Story.getStory.bind(story.id))
    
        index.appendChild(ulTag);
        ulTag.appendChild(liTag);
        liTag.appendChild(btn);
    }; 
};