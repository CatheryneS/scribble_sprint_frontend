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
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let newStory = new Stories(e.target);
            newStory.saveAndLoadStory();
        });
    
        section.appendChild(form);
        form.appendChild(label);
        form.appendChild(title);
        form.appendChild(text);
        form.appendChild(btn);
    };

    hideNotebooks() {
        const intro = document.getElementById('intro');
        const row = document.getElementById('notebooks');
        
        intro.style.display = "none";
        row.style.display = "none";
        debugger

        for (let story of this.stories) {
            this.createIndex(story)
        }
    };

    showNotebooks() {
        const intro = document.getElementById('intro');
        const row = document.getElementById('notebooks');
        const story = document.getElementById('story');
    
        intro.style.display = "block";
        row.style.display = "block";
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