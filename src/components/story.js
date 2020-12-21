class Story {
    constructor(formData) {
        this.title = formData[0].value
        this.content = formData[1].value
        this.promptId = formData.dataset.id
        this.adapter = new StoriesAdapter()
    };

    saveAndLoadStory() {
        this.adapter.saveStoryToDatabase(this)
        .then(story => renderStoryPage(story))
    }
}