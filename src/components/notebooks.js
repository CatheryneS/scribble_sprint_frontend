class Notebooks {
    constructor() {
        this.notebooks = []
        this.adapter = new NotebooksAdapter()
        this.loadNotebooks()
    }

    loadNotebooks() {
        this.adapter.getNotebooks()
        .then(notebooks => {
            notebooks.data.forEach(notebook => this.notebooks.push(new Notebook(notebook.id, notebook.attributes)));
        })
        .then(() => this.notebooks.forEach(notebook => notebook.createNotebook()))
    };

}