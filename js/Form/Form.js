import Button from "../Button/Button.js"
import Input from "../Input/Input.js";
import API from "../API/API.js";
import Notes from "../Notes/Notes.js";
import Select from "../Select/Select.js";

//class form to render form dependes on id
class Form {
    constructor() {
        this.form = document.createElement('form')
    }

    //render edit form
    renderEditForm({ name, dates, category, content, ...rest }, onClose) {
        this.form.textContent = ""
        const btnWrapper = document.createElement('div')
        btnWrapper.className = "btn-wrapper"
        const inputName = Input.renderInput("name", name)
        const inputDate = Input.renderInput("date", dates[dates.length - 1])
        const inputContent = Input.renderInput("content", content)
        const selectCategory = Select.renderSelect("category", category)
        const editBtn = Button.renderButton("editNotes")
        const cancelBtn = Button.renderButton("cancel")
        cancelBtn.addEventListener("click", onClose)
        btnWrapper.append(editBtn, cancelBtn)
        this.form.append(inputName, inputDate, inputContent, selectCategory, btnWrapper)
        this.form.addEventListener("submit", this.handleSubmitUpdate.bind(this, onClose, { ...rest, dates }))
        return this.form
    }

    //render delete form
    renderDeleteForm(id, onClose) {
        this.form.textContent = ""
        const btnWrapper = document.createElement('div')
        btnWrapper.className = "btn-wrapper"
        const deleteBtn = Button.renderButton("deleteNotes")
        const cancelBtn = Button.renderButton("cancel")
        cancelBtn.addEventListener("click", onClose)
        btnWrapper.append(deleteBtn, cancelBtn)
        this.form.append(btnWrapper)
        this.form.addEventListener("submit", this.handleSubmitDelete.bind(this, onClose, id))
        return this.form
    }

    //render delete all form
    renderDeleteAllForm(id, onClose) {
        this.form.textContent = ""
        const btnWrapper = document.createElement('div')
        btnWrapper.className = "btn-wrapper"
        const deleteBtn = Button.renderButton("deleteNotes")
        const cancelBtn = Button.renderButton("cancel")
        cancelBtn.addEventListener("click", onClose)
        btnWrapper.append(deleteBtn, cancelBtn)
        this.form.append(btnWrapper)
        this.form.addEventListener("submit", this.handleSubmitDeleteAll.bind(this, onClose, id))
        return this.form
    }

    //render create form
    renderCreateForm(onClose) {
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

    //handler delete
    async handleSubmitDelete(onClose, id, e) {
        e.preventDefault()
        try {
            const note = await API.deleteData(id)
            const li = document.getElementById(id)
            li.remove()
            Notes.deleteNotes(id)
            onClose()
        } catch (err) {
            console.error(err)
        }
    }

    //handler delete all
    async handleSubmitDeleteAll(onClose, e) {
        e.preventDefault()
        try {
            const note = await API.deleteAllData()
            const elem = document.querySelectorAll(".notes-list li")
            const elemArchiv = document.querySelectorAll(".notes-list-archive li")
            elem.forEach(li=>{
                li.remove()
            })
            elemArchiv.forEach(li=>{
                li.remove()
            })
            
            onClose()
        } catch (err) {
            console.error(err)
        }
    }

    //handler update
    async handleSubmitUpdate(onClose, { id, dates, created }, e) {
        e.preventDefault()
        const formData = this.createFormData(dates)

        try {
            const note = await API.updateData(id, { ...formData, created })
            const oldLi = document.getElementById(id)
            const li = Notes.renderCardNote(note);
            const parent = document.querySelector(".notes-list")
            parent.replaceChild(li, oldLi);
            onClose()
        } catch (err) {
            console.error(err)
        }
    }

    //handler create
    async handleSubmitCreate(onClose, e) {
        e.preventDefault()
        const formData = this.createFormData()

        try {
            const note = await API.createData(formData)
            const li = await Notes.renderCardNote(note);
            const parent = document.querySelector(".notes-list")
            Notes.createNotes(note, note.category)
            parent.appendChild(li);
            onClose()
        } catch (err) {
            console.error(err)
        }
    }

    //helper to create object for fetch
    createFormData(dates = []) {
        const inputs = this.form.querySelectorAll("input")
        const select = this.form.querySelectorAll("select")
        const formData = {}
        inputs.forEach(item => {
            formData[item.name] = item.value
            if (item.name === "dates") {
                dates.push(item.value)
                formData[item.name] = dates

            }
        })
        select.forEach(item => {
            formData[item.name] = item.value
        })

        formData.created = new Date()
        return formData
    }
}

export default new Form()