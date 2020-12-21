class PromptsAdapter {
    constructor() {
        this.endPoint = "http://localhost:3000/api/v1/prompts"
    }

    grabPromptBasedOnNotebook(notebookId){
        return fetch(`${this.endPoint}/${notebookId}`).then(resp => resp.json())
    }
}