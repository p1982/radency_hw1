import Button from "../Button/Button.js"
import Modal from "../Modal/Modal.js";
import { configNotes } from "./configNotes.js";
import { formatDateWithMonth } from "../utils/functions.js"
import { configHeaderTable } from "./configHeaderTable.js"

//class Notes - take list of notes and render it, change archiv status for one and all notes
class Notes {
    constructor() {
        this.notes = []
        this.archiv = []
        this.active = []
        this.activeTask = []
        this.activeIdea = []
        this.activeQuote = []
        this.activeRandom = []
        this.archivTask = []
        this.archivIdea = []
        this.archivQuote = []
        this.archivRandom = []
    }

    //takes all notes - and  filter by archiv status 
    init(notes) {
        this.notes = notes
        this.active = this.notes.filter(item => !item.archiv)
        this.archiv = this.notes.filter(item => item.archiv)
        this.createSates()
        return this.notes
    }

    //create states for difere3nt notes group
    createSates() {
        
        this.activeTask = this.active.filter(item => item.category === "Task")
        this.activeIdea = this.active.filter(item => item.category === "Idea")
        this.activeQuote = this.active.filter(item => item.category === "Quote")
        this.activeRandom = this.active.filter(item => item.category === "Random Thought")
        console.log(this.activeTask);
        this.archivTask = this.archiv.filter(item => item.category === "Task")
        this.archivIdea = this.archiv.filter(item => item.category === "Idea")
        this.archivQuote = this.archiv.filter(item => item.category === "Quote")
        this.archivRandom = this.archiv.filter(item => item.category === "Random Thought")
    }

    // take list of notes and call render card function and head of table
    renderNotes() {
        const ul = document.createElement("ul")
        ul.className = "notes-list"
        this.active.forEach(note => {
            const li = this.renderCardNote(note);
            ul.appendChild(li);
        });
        const header = this.renderHeaderTable("table")
        ul.prepend(header)
        return ul;
    }

    //render notes card
    renderCardNote(note) {
        const { id, name, created, category, content, dates } = note
        const editButton = Button.renderButton("editNotesModal", this.editNotesModal.bind(this, note));
        const archivButton = Button.renderButton("archivNotes", this.handleArchiv.bind(this, id));
        const deleteButton = Button.renderButton("deleteNotesModal", this.deleteNotesModal.bind(this, id));
        const li = document.createElement('li')
        const icon = configNotes[category]
        li.id = id
        li.className = "notes-item"
        const formatedDate = formatDateWithMonth(created)
        li.insertAdjacentHTML('beforeend',
            `<div className='notes notes-btn'>${icon}</div>
            <h6 class='notes notes-title'>${name}</h6>
            <p class='notes notes-text'>${formatedDate}</p>
            <p class='notes notes-text'>${category}</p>
            <p class='notes notes-content'>${content}</p>
            <ul class='notes notes-data'>${dates.map(date => `<li>${date.replace(/-/g, '/')} </li>`).join(",")}</ul>`)
        li.append(editButton, archivButton, deleteButton)
        return li
    }

    //render archiv card
    renderNotesCard(active, archiv, category) {
        const li = document.createElement("li")
        li.id = category
        li.className = "notes-item"
        const icon = configNotes[category]
        li.insertAdjacentHTML("beforeend", `
            <div className='notes notes-btn'>${icon}</div>
            <p class='notes notes-text'>${category}</p>
            <p class='notes notes-text'>${active.length}</p>
            <p class='notes notes-content'>${archiv.length}</p>`)
        return li
    }

    // take list of notes in archiv and call render card function and head of table
    renderNoteCategory() {
        const ul = document.createElement("ul")
        ul.className = "notes-list-archive"
        const header = this.renderHeaderArchived("archive")
        ul.prepend(header)
        if (this.activeTask.length || this.archivTask.length) {
            const body = this.renderNotesCard(this.activeTask, this.archivTask, "Task")
            ul.append(body)
        }
        if (this.activeIdea.length || this.archivIdea.length) {
            const body = this.renderNotesCard(this.activeIdea, this.archivIdea, "Idea")
            ul.append(body)
        }

        if (this.activeQuote.length || this.archivQuote.length) {
            const body = this.renderNotesCard(this.activeQuote, this.archivQuote, "Quote")
            ul.append(body)
        }

        if (this.activeRandom.length || this.archivRandom.length) {
            const body = this.renderNotesCard(this.activeRandom, this.archivRandom, "Random Thought")
            ul.append(body)
        }

        return ul;
    }

    //render header archive table
    renderHeaderArchived(id) {
        const headerDiv = document.createElement('div');
        const body = configHeaderTable[id]
        headerDiv.className = "notes-item notes-item--header"
        headerDiv.insertAdjacentHTML('beforeend', body)
        return headerDiv
    }

    //render header notes table
    renderHeaderTable(id) {
        const headerDiv = document.createElement('div');
        const body = configHeaderTable[id]
        headerDiv.className = "notes-item notes-item--header"
        headerDiv.insertAdjacentHTML('beforeend', body)
        const archivButton = Button.renderButton("archivAllNotes", this.handleArchivAll.bind(this));
        const deleteButton = Button.renderButton("deleteNotesModal", this.deleteAllNotesModal.bind(this));
        headerDiv.append(archivButton, deleteButton)
        return headerDiv
    }

    //handle archiv one card
    handleArchiv(id) {
        this.notes = this.notes.map(note => {
            if (note.id === id) {
                return { ...note, archiv: !note.archiv }
            }
            return note
        })
        console.log(this.notes);
        const li = document.getElementById(id)
        li.remove()
        this.init(this.notes)
        const { category } = this.notes.find(note => note.id)
        if (category === "Task") {
            console.log(this.activeTask);
            this.updateRenderArchive(category, this.activeTask, this.archivTask)
        }
        if (category === "Idea") {
            this.updateRenderArchive(category, this.activeIdea, this.archivIdea)
        }
        if (category === "Quote") {
            this.updateRenderArchive(category, this.activeQuote, this.archivQuote)
        }
        if (category === "Random Thought") {
            this.updateRenderArchive(category, this.activeRandom, this.archivRandom)
        }

    }

    //open edit modal
    editNotesModal(note) {
        Modal.renderModal("editModal", note)
    }

    //open delete modal
    deleteNotesModal(id) {
        Modal.renderModal("deleteModal", id)
    }

    //open delete all modal
    deleteAllNotesModal(id) {
        Modal.renderModal("deleteAllModal", id)
    }

    //handle all archiv
    handleArchivAll() {
        this.notes = this.notes.map(item => {
            if (!item.archiv) {
                return { ...item, archiv: !item.archiv }
            }
            return item
        })

        this.active = []
        this.archiv = this.notes
        this.init(this.notes)
        const elem = document.querySelectorAll(".notes-list li")
        elem.forEach(li => {
            li.remove()
        })
        this.updateRenderArchive("Task", this.activeTask, this.archivTask)
        this.updateRenderArchive("Idea", this.activeIdea, this.archivIdea)
        this.updateRenderArchive("Quote", this.activeQuote, this.archivQuote)
        this.updateRenderArchive("Random Thought", this.activeRandom, this.archivRandom)
    }

    //create one notes in archiv
    createNotes(note, category) {
        this.notes = [...this.notes, note]
        this.active = [...this.active, note]

        if (category === "Task") {
            this.activeTask = [...this.activeTask, note]
            this.updateRenderArchive(category, this.activeTask, this.archivTask)
        }
        if (category === "Idea") {
            this.activeIdea = [...this.activeIdea, note]
            this.updateRenderArchive(category, this.activeIdea, this.archivIdea)
        }
        if (category === "Quote") {
            this.activeQuote = [...this.activeQuote, note]
            this.updateRenderArchive(category, this.activeQuote, this.archivQuote)
        }
        if (category === "Random Thought") {
            this.archivRandom = [...this.archivRandom, note]
            this.updateRenderArchive(category, this.activeRandom, this.archivRandom)
        }

    }

    //delete one notes from archiv
    deleteNotes(id) {
        const { category } = this.notes.find(item => item.id === id)

        this.notes = this.notes.filter(item => item.id !== id)
        this.active = this.active.filter(item => item.id !== id)
        if (category === "Task") {
            this.activeTask = this.activeTask.filter(item => item.id !== id)
            this.updateRenderArchive(category, this.activeTask, this.archivTask)
        }
        if (category === "Idea") {
            this.activeIdea = this.activeIdea.filter(item => item.id !== id)
            this.updateRenderArchive(category, this.activeIdea, this.archivIdea)
        }
        if (category === "Quote") {
            this.activeQuote = this.activeQuote.filter(item => item.id !== id)
            this.updateRenderArchive(category, this.activeQuote, this.archivQuote)
        }
        if (category === "Random Thought") {
            this.activeRandom = this.activeRandom.filter(item => item.id !== id)
            this.updateRenderArchive(category, this.activeRandom, this.archivRandom)
        }
    }

    //update one notes in archiv
    updateRenderArchive(category, activ, archiv) {
        const parent = document.querySelector('.notes-list-archive')
        const li = this.renderNotesCard(activ, archiv, category)
        const oldLi = document.getElementById(category)
        parent.replaceChild(li, oldLi);
    }

}

export default new Notes()
