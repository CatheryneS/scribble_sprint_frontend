class App {
    constructor() {
        this.notebooks = new Notebooks()
    }

    openNotebook() {
        const intro = document.getElementById('intro');
        const row = document.getElementById('notebooks');
        const prompt = document.getElementById('prompt');
        const story = document.getElementById('story');
    
        intro.style.display = "none";
        row.style.display = "none";
        prompt.style.display = "block";
        story.style.display = "block";

        showTimer();
        let generator = new PromptGenerator(this); 
        generator.grabPrompt(this.id);
    };

    createStoryForm() {
        const section = document.getElementById('story');
        const form = document.createElement('form');
        const text = document.createElement('textarea');
        const label = document.createElement('label')
        const title = document.createElement('input');
        const btn = document.createElement('button');
    
        form.dataset.id = `${this.id}`;
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
}