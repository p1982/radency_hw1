import Button from "../Button/Button.js"
import Input from "../Input/Input.js";
import API from "../API/API.js";
import Notes from "../Notes/Notes.js";
import Select from "../Select/Select.js";
class Form {
    constructor(){
        this.form = document.createElement('form')
        
    }
    renderEditForm ({id, name, created, category, content, dates}, onClose) {
        this.form.textContent = ""
        const btnWrapper = document.createElement('div')
        btnWrapper.className = "btn-wrapper"
        const inputName = Input.renderInput("name", name)
        const inputDate = Input.renderInput("date", created)
        const inputContent = Input.renderInput("content", content)
        const selectCategory = Select.renderSelect("category", category)
        const editBtn = Button.renderButton("editNotes")
        const cancelBtn = Button.renderButton("cancel")
        cancelBtn.addEventListener("click", onClose)
        btnWrapper.append(editBtn, cancelBtn)
        this.form.append(inputName, inputDate, inputContent, selectCategory, btnWrapper)
        this.form.addEventListener("submit", this.handleSubmitUpdate.bind(this, onClose, id))
        return this.form
    }

    renderDeleteForm (id, onClose) {
        this.form.textContent = ""
        const btnWrapper = document.createElement('div')
        btnWrapper.className = "btn-wrapper"
        const editBtn = Button.renderButton("editNotes")
        const cancelBtn = Button.renderButton("cancel")
        cancelBtn.addEventListener("click", onClose)
        btnWrapper.append(editBtn, cancelBtn)
        this.form.append(btnWrapper)
        this.form.addEventListener("submit", this.handleSubmitDelete.bind(this, onClose, id))
        return this.form
    }

    renderCreateForm (onClose) {
        this.form.textContent = ""
        const btnWrapper = document.createElement('div')
        btnWrapper.className = "btn-wrapper"
        const inputName = Input.renderInput("name")
        const inputDate = Input.renderInput("date")
        const inputContent = Input.renderInput("content")
        const selectCategory = Select.renderSelect("category")
        const createBtn = Button.renderButton("createNotes")
        const cancelBtn = Button.renderButton("cancel")
        cancelBtn.addEventListener("click", onClose)
        btnWrapper.append(createBtn, cancelBtn)
        this.form.append(inputName, inputDate, inputContent, selectCategory, btnWrapper)
        this.form.addEventListener("submit", this.handleSubmitCreate.bind(this, onClose))
        return this.form
    }

    async handleSubmitDelete (onClose, id, ) {
        e.preventDefault()
        try{
            const note = await API.deleteData(id)
            const li = document.getElementById(id)
            li.remove()
            onClose()
        } catch (err) {
            console.error(err)
        } 
    }

    async handleSubmitUpdate(onClose, id, e){
        e.preventDefault()
        const inputs = this.form.querySelectorAll("input")
        const formData = {}
        inputs.forEach( item => {
            formData[item.name] = item.value
        })
        try{
            const note = await API.updateData(id, formData)
            const oldLi = document.getElementById(id)
            const li = Notes.renderCardNote(note);
            const parent = document.querySelector(".notes-list")
            parent.replaceChild(oldLi, li);
            onClose()
        } catch (err) {
            console.error(err)
        } 
    }

    async handleSubmitCreate(onClose, e){
        e.preventDefault()
        const inputs = this.form.querySelectorAll("input")
        const formData = {}
        inputs.forEach( item => {
            formData[item.name] = item.value
        })
        try{
            const note = await API.createData(formData)
            const li = this.renderCardNote(note);
            const parent = document.querySelector(".notes-list")
            parent.appendChild(li);
            onClose()
        } catch (err) {
            console.error(err)
        } 
    }
}

export default new Form()