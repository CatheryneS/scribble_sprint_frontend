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
    }
}