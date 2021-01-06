class PromptsAdapter {
    constructor() {
        this.endPoint = "https://scribble-sprint-api.herokuapp.com/api/v1/prompts"
    }

    grabPromptBasedOnNotebook(notebookId){
        return fetch(`${this.endPoint}/${notebookId}`).then(resp => resp.json())
    }
}