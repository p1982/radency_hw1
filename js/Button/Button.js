import { configButtons } from "./configButton.js"
class Button {
    renderButton(configId, cb) {
        const {id, className, text, type } = configButtons[configId]
        const button = document.createElement("button")
        button.className = className
        button.insertAdjacentHTML("beforeend", text)
        button.type = type || "button"
        button.id = id
        button.addEventListener("click", cb)
        return button
        // return (
        //     `<button class=${className} type=${type?type:"button"}>${text}</button>`
        // )
    }
}

export default new Button()