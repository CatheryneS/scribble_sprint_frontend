class Notebook {
    constructor(id, notebookAttr) {
        this.id = id
        this.name = notebookAttr.name
        this.prompts = notebookAttr.prompts
        this.stories = notebookAttr.stories
        Notebook.all.push(this)
    }
}
Notebook.all = []