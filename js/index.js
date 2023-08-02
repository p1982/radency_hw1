import API from "./API/API.js";
import Notes from "./Notes/Notes.js"

const root = document.querySelector("#root")

const init = async () => {
    try {
        const notes = await API.getData("")
        const list = Notes.renderNotes(notes)
        const container = document.createElement("div")
        container.className = "container"
        container.append(list)
        root.append(container)
    } catch (e) {
        console.error(e)
    }
}

init()