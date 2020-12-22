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

        let generator = new PromptGenerator(this); 
        generator.grabPrompt(this.id);
        app.showTimer();
    };

    buildStoryForm() {
        const section = document.getElementById('story');
        const form = document.createElement('form');
        const text = document.createElement('textarea');
        const title = document.createElement('input');
        const btn = document.createElement('button');
    
        form.className = "form-group";
        text.className = "form-control";
        text.rows = '5';
        form.dataset.id = `${this.id}`;
        form.id = "story-form";
        title.id = "Title";
        title.type = "text";
        title.placeholder = "Name your entry";
        text.id = "story-area";
        text.placeholder = "Let the story begin..."
        btn.innerText = "Save";
        btn.type = "submit";
        btn.className = "btn btn-outline-secondary";
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let newStory = new Stories(e.target);
            newStory.saveAndLoadStory();
        });
    
        section.appendChild(form);
        form.appendChild(title);
        form.appendChild(text);
        form.appendChild(btn);
    };

    hideNotebooks() {
        const intro = document.getElementById('intro');
        const row = document.getElementById('notebooks');
        
        intro.style.display = "none";
        row.style.display = "none";

        for (let story of this.stories) {
            this.createIndex(story)
        }
    };

    showNotebooks() {
        const intro = document.getElementById('intro');
        const row = document.getElementById('notebooks');
        const story = document.getElementById('story');
    
        intro.style.display = "block";
        row.style.display = "";
        story.style.display = "none";
    }

    showTimer() {
        const section = document.getElementById('story');
        const timer = document.createElement('h2');
    
        timer.id = "timer";
    
        section.appendChild(timer);
        this.startTimer = setInterval(app.updateTimer, 1000);
    };

    updateTimer() {
        const timer = document.getElementById('timer');
        if (timer){
            const mins = Math.floor(time/60);
            let secs = time % 60;
    
            secs = secs < 10 ? '0' + secs : secs;
    
            timer.innerHTML = `${mins}:${secs}`;
            time--;
    
            if (secs == 0 && mins == 0) {
                clearInterval(app.startTimer);
                timer.innerHTML = "Time's Up!"
            }
        }
    }
    
}