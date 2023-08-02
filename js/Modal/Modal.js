import Form from "../Form/Form.js"
import { configModals } from "./configModal.js"
class Modal {
    renderModal(id, note) {
        const { title, text } = configModals[id]
        const root = document.querySelector("#root")
        const openModalDiv = document.createElement('div');
        openModalDiv.id = id;
        openModalDiv.className = 'modal';

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

        const form = Form.renderEditForm(note, this.closeModal.bind(this, id))

        modalHeaderDiv.appendChild(modalTitleH3);
        modalHeaderDiv.appendChild(closeButtonA);
        modalBodyDiv.append(form)
        modalContentDiv.appendChild(modalHeaderDiv);
        modalContentDiv.appendChild(modalBodyDiv);

        modalDialogDiv.appendChild(modalContentDiv);

        openModalDiv.appendChild(modalDialogDiv);

        root.append(openModalDiv)
    }

    closeModal(id){
        const modal = document.getElementById(id)
        modal.remove()
    }
}

export default new Modal()