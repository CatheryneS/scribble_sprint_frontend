class NotebooksAdapter {
    constructor() {
        this.endPoint = "http://localhost:3000/api/v1/notebooks"
    }

    getNotebooks(){
        return fetch(this.endPoint).then(resp => resp.json())
    }
}