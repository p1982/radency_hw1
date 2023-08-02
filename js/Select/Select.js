import Form from "../Form/Form.js"
import { configSelect } from "./configSelect.js"
class Select {
    renderSelect(id, value){
        const optionArray = configSelect[id]
        const selectElement = document.createElement('select');
        optionArray.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            selectElement.appendChild(option);
          });
          if(value){
            selectElement.value = value
          }
          return selectElement
    }
}

export default new Select()