class PromptGenerator {
    constructor(notebook) {
        this.relatedNotebookId = notebook.id
        this.adapter = new PromptsAdapter()
    }

    grabPrompt() {
        this.adapter.grabPromptBasedOnNotebook(this.relatedNotebookId)
        .then(prompt => {
            let chosenPrompt = new Prompt(prompt.data.attributes);
            chosenPrompt.showPrompt();
        })
    }
}