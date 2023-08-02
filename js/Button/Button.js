import { configButtons } from "./configButton.js"
class Button {
    renderButton(id) {
        const { className, text, type } = configButtons[id]
        // const button = document.createElement("button")
        // button.className = className
        // button.textContent = text
        // button.type = type || "button"
        return (
            `<button class=${className} type=${type?type:"button"}>${text}</button>`
        )
    }
}

export default new Button()