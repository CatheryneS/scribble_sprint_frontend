const BASEURL = "http://localhost:3000/api/v1/"
const NOTEBOOKURL = BASEURL + "notebooks"
const PROMPTURL = BASEURL + "prompts"
const STORYURL = BASEURL + "stories"

fetch(PROMPTURL)
.then(resp => resp.json())
.then(obj => {
    console.log(obj)
})