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
        const pTag = document.createElement('p');
        const imgTag = document.createElement('img');
        const btn = document.createElement('button');

        column.className = 'col-lg-3 mb-4';
        card.className = 'card bg-dark text-white';
        card.dataset.id = `${this.id}`;
        card.addEventListener('click', app.openNotebook.bind(this));
        
        imgTag.className = "card-img";
        imgTag.src = this.image;
        pTag.className = "card-text p-3 mb-2 bg-secondary text-white";
        pTag.innerText = this.instruction;
        sect.className = "card-img-overlay";
        h4Tag.className = "card-title p-3 mb-2 bg-secondary text-white rounded";
        h4Tag.style.textAlign = "center"
        h4Tag.innerText = `${this.name}`;
        btn.innerText = "View All Stories Inside";
        btn.className = "btn btn-secondary"
        btn.addEventListener('click', app.hideNotebooks.bind(this));
    
        card.appendChild(imgTag);
        card.appendChild(sect);
        sect.appendChild(h4Tag);
        sect.appendChild(pTag);
        row.appendChild(column);
        column.appendChild(card);
        column.appendChild(btn);
    }

    createIndex(story) {
        const index = document.getElementById('notebook-index');
        const ulTag = document.createElement('ul');
        const liTag = document.createElement('li');
        const btn = document.createElement('button');
        const title = document.getElementById('notebook-title');
        
        index.style.display = "block";
        title.innerText = this.name;
        ulTag.className = "list-group";
        ulTag.id = "story-list";
        liTag.className = "list-group-item float-sm-left font-weight-bold";
        liTag.innerText = `${story.title}`;
        btn.innerText = "Read Story";
        btn.dataset.id = `${story.id}`;
        btn.className = "btn btn btn-outline-info btn-sm float-sm-right";
        btn.addEventListener('click', Story.getStory.bind(story.id));
    
        index.appendChild(ulTag);
        ulTag.appendChild(liTag);
        liTag.appendChild(btn);
    }; 
};