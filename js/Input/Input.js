import { configInputs } from "./configInputs.js"

//class render inputs depends on id
class Input {
    //render input
    renderInput(configId, value) {
        const { id, className, text, type } = configInputs[configId]

        const inputElement = document.createElement('input');
        inputElement.id = id;
        inputElement.required = true
        inputElement.className = className;
        if (value) {
            inputElement.value = value
            if (type === "date") {
                inputElement.value = new Date(value).toISOString().substr(0, 10)
            }
        }
        if (!value) {
            inputElement.placeholder = text
            if (type === "date") {
                inputElement.value = new Date().toISOString().substr(0, 10)
            }
        }

        inputElement.type = type ? type : 'text';
        inputElement.name = id
        return inputElement;
    }
}

export default new Input()