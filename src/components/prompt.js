class Prompt {
    constructor(prompt) {
        this.description = prompt.description 
    }

    showPrompt() {
        const section = document.getElementById('prompt')
        const card = document.createElement('section');
        const h2Tag = document.createElement('h2');
    
        card.className = 'prompt-description';
        h2Tag.innerText = `${this.description}`;
    
        section.appendChild(card);
        card.appendChild(h2Tag);
    
        createStoryForm(prompt);
    }
}