import { configInputs } from "./configInputs.js"
class Input {
    renderInput(configId, value) {
        const { id, className, text, type } = configInputs[configId]
        
        const inputElement = document.createElement('input');
        inputElement.id = id;
        inputElement.className = className;
        if(value) {
            inputElement.value = value
            if(type==="date"){
                inputElement.value = new Date(value)
            }
        }
        if(!value){
            inputElement.placeholder = text
            if(type==="date") {
                inputElement.value = new Date()
             }
        }
        
        inputElement.type = type ? type : 'text';
        inputElement.name = id
        return inputElement;
    }
}

export default new Input()