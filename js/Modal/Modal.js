import Form from "../Form/Form.js"
import { configModals } from "./configModal.js"
class Modal {
    constructor(){
        this.openModalDiv = document.createElement('div');
        
    }
    renderModal(id, note) {
        this.openModalDiv.textContent = ""
        const { title, text } = configModals[id]
        const root = document.querySelector("#root")
        
        this.openModalDiv.id = id;
        this.openModalDiv.className = 'modal';

        const modalDialogDiv = document.createElement('div');
        modalDialogDiv.className = 'modal-dialog';

        const modalContentDiv = document.createElement('div');
        modalContentDiv.className = 'modal-content';

        const modalHeaderDiv = document.createElement('div');
        modalHeaderDiv.className = 'modal-header';

        const modalTitleH3 = document.createElement('h3');
        modalTitleH3.className = 'modal-title';
        modalTitleH3.textContent = title;

        const closeButtonA = document.createElement('a');
        closeButtonA.href = '#close';
        closeButtonA.title = 'Close';
        closeButtonA.className = 'close';
        closeButtonA.textContent = '×';
        closeButtonA.addEventListener('click', this.closeModal.bind(this, id))

        const modalBodyDiv = document.createElement('div');
        modalBodyDiv.className = 'modal-body';
        modalBodyDiv.textContent = text

        if(id === "createModal") {
            const form = Form.renderCreateForm(this.closeModal.bind(this))
            modalBodyDiv.append(form)
        }
        if(id === "editModal") {
            const form = Form.renderEditForm(note, this.closeModal.bind(this, id))
            modalBodyDiv.append(form)
        }
        if(id === "deleteModal") {
            const form = Form.renderDeleteForm(this.closeModal.bind(this, id))
            modalBodyDiv.append(form)
        }
        

        modalHeaderDiv.appendChild(modalTitleH3);
        modalHeaderDiv.appendChild(closeButtonA);
       
        modalContentDiv.appendChild(modalHeaderDiv);
        modalContentDiv.appendChild(modalBodyDiv);

        modalDialogDiv.appendChild(modalContentDiv);

        this.openModalDiv.appendChild(modalDialogDiv);

        root.append(this.openModalDiv)
    }

    closeModal(id){
        const modal = document.getElementById(id)
        modal.remove()
    }
}

export default new Modal()