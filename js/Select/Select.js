import { configSelect } from "./configSelect.js"

//class select render depends on id
class Select {
  //render select
  renderSelect(id, value) {
    const optionArray = configSelect[id]
    const selectElement = document.createElement('select');
    selectElement.name = id
    optionArray.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      selectElement.appendChild(option);
    });
    if (value) {
      selectElement.value = value
    }
    return selectElement
  }
}

export default new Select()