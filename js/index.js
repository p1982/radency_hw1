import API from "./API/API.js";
import Button from "./Button/Button.js";
import Notes from "./Notes/Notes.js"
import Modal from "./Modal/Modal.js";

//variable - takes div root from html
const root = document.querySelector("#root")

// start render
const render = () => {
    const list = Notes.renderNotes()
    const container = document.createElement("div")
    container.className = "container"

    const sectionTable = document.createElement("section")

    const createBtn = Button.renderButton("createNotesModal")
    const btnWrapper = document.createElement("div")
    btnWrapper.className = "btn-wrapper"
    btnWrapper.append(createBtn)
    createBtn.addEventListener("click", () => {
        Modal.renderModal("createModal")
    })
    sectionTable.append(list, btnWrapper)

    const sectionArchived = document.createElement("section")
    const archivList = Notes.renderNoteCategory()
    sectionArchived.append(archivList)

    container.append(sectionTable, sectionArchived)
    root.append(container)
}

// init application - start get data
const init = async () => {
    try {
        const notes = await API.getData("")
        Notes.init(notes)
        render()
    } catch (e) {
        console.error(e)
    }
}

init()