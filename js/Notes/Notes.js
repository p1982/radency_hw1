import Button from "../Button/Button.js"
class Notes {
    renderNotes(notes) {
        const ul = document.createElement("ul")
        ul.className = "notes-list"
        ul.insertAdjacentHTML('beforeend', `${notes.map(note=>{
            return this.renderCardNote(note)
        }).join("")}`)
        return ul
    }
    renderCardNote ({id, icon, name, created, category, content, dates}) {
        return (
            `<li id=${id} class='notes-item'>
                <div className='notes notes-btn'>${icon}</div>
                <h6 class='notes notes-title'>${name}</h6>
                <p class='notes notes-text'>${created}</p>
                <p class='notes notes-text'>${category}</p>
                <p class='notes notes-content'>${content}</p>
                <ul class='notes notes-data'>${dates.map(date=>`<li>${date}</li>`).join("")}</ul>
                <div className='notes notes-btn'>${Button.renderButton("editNotes")}</div>
                <div className='notes notes-btn'>${Button.renderButton("downLoadNotes")}</div>
                <div className='notes notes-btn'>${Button.renderButton("deleteNotes")}</div>
            </li>`
        )
    }
}

export default new Notes()