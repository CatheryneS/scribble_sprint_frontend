class StoriesAdapter {
    constructor() {
        this.endPoint = "https://scribble-sprint-api.herokuapp.com/api/v1/stories"
    }

    saveStoryToDatabase(story){
        return fetch(this.endPoint,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                title: story.title,
                content: story.content,
                prompt_id: story.promptId
            })
        })
        .then(resp => resp.json());
    }

    fetchStory(storyId){
        return fetch(`${this.endPoint}/${storyId}`)
        .then(resp => resp.json())
    }

}
