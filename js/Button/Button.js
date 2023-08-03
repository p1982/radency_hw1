import { configButtons } from "./configButton.js"

//class button render button dependes on id
class Button {
    
    //render button
    renderButton(configId, cb) {
        const { id, className, text, type } = configButtons[configId]
        const button = document.createElement("button")
        button.className = className
        button.insertAdjacentHTML("beforeend", text)
        button.type = type || "button"
        button.id = id
        button.addEventListener("click", cb)
        return button
    }
}

export default new Button()