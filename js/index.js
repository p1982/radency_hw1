import API from "./API/API.js";
import Button from "./Button/Button.js";
import Notes from "./Notes/Notes.js"
import Modal from "./Modal/Modal.js";

const root = document.querySelector("#root")

const init = async () => {
    try {
        const notes = await API.getData("")
        const list = Notes.renderNotes(notes)
        const container = document.createElement("div")
        container.className = "container"
       
        const createBtn = Button.renderButton("createNotesModal")
        createBtn.addEventListener("click", ()=>{
            Modal.renderModal("createModal")
        })
        container.append(list, createBtn)
        root.append(container)
    } catch (e) {
        console.error(e)
    }
}

init()