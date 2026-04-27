//  recieve inputs and create a new or edited object
import {v7 as genId} from 'uuid';

const HandleFormInput = (e, id) => {
    e.preventDefault();
    const form = document.getElementById('inputForm');
    const rawData = new FormData(form);
    const rawDataObj = Object.fromEntries(rawData)

    // Ensure both inputs are filled
    const hasEmpty = Object.values(rawDataObj).some(val => !(val.trim()));
    if (hasEmpty) {
        alert('All fields are required!');
        return;
    }
    // Add id appropriately.
    const isEdit = Boolean(id);
    const ID = isEdit ? id : genId();
    const data = {_id : ID, ...rawDataObj}
    console.log(data);
    form.reset();
    return data;
}

export default HandleFormInput;