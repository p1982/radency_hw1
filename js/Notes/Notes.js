import Button from "../Button/Button.js"
import Modal from "../Modal/Modal.js";
import { configNotes } from "./configNotes.js";
class Notes {
    renderNotes(notes) {
        const ul = document.createElement("ul")
        ul.className = "notes-list"
        notes.forEach(note => {
            const li = this.renderCardNote(note);
            ul.appendChild(li);
        });
    return ul;
    }
    renderCardNote(note) {
        const {id, name, created, category, content, dates} = note
        const editButton = Button.renderButton("editNotesModal", this.editNotesModal.bind(this, note));
        const downloadButton = Button.renderButton("downLoadNotes");
        const deleteButton = Button.renderButton("deleteNotesModal", this.deleteNotesModal.bind(this, id));
        const li = document.createElement('li')
        const icon = configNotes[category]
        li.id = id
        li.className = "notes-item"
        li.insertAdjacentHTML('beforeend', 
            `<div className='notes notes-btn'>${icon}</div>
            <h6 class='notes notes-title'>${name}</h6>
            <p class='notes notes-text'>${created}</p>
            <p class='notes notes-text'>${category}</p>
            <p class='notes notes-content'>${content}</p>
            <ul class='notes notes-data'>${dates.map(date => `<li>${date}</li>`).join("")}</ul>`)
        li.append(editButton, downloadButton, deleteButton)
        return li
        
    }
    editNotesModal(note) {
        Modal.renderModal("editModal", note)
    }
    
    deleteNotesModal(id){
        Modal.renderModal("deleteModal", id)
    }
}

export default new Notes()
