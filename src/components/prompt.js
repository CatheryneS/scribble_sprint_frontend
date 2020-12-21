class Prompt {
    constructor(prompt) {
        this.id = prompt.id
        this.description = prompt.attributes.description 
    }

    showPrompt() {
        const section = document.getElementById('prompt')
        const card = document.createElement('section');
        const h2Tag = document.createElement('h2');
    
        card.className = 'prompt-description';
        h2Tag.innerText = `${this.description}`;
    
        section.appendChild(card);
        card.appendChild(h2Tag);

        app.createStoryForm.bind(this)();
    }
}