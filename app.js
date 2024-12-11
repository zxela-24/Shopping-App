const nameInput = document.getElementById('name-input');
const quantityInput = document.getElementById('quantity-input');
const categorySelect = document.getElementById('category-select');
const addButton = document.getElementById('add-button');
const cancelButton = document.getElementById('cancel-button');
const shoppingList = document.getElementById('shopping-list');
const countBadge = document.getElementById('count-badge');

let shoppingItems = [];

const clear = () => {
    nameInput.value = '';
    quantityInput.value = 1;
    categorySelect.value = '';
};
clear();

cancelButton.addEventListener('click', clear);

addButton.addEventListener('click', () => {
    if (!isInputValid()) {
        return;
    }

    const shoppingItem = {
        name: nameInput.value,
        quantity: quantityInput.value,
        category: categorySelect.value,
        addedDate: new Date()
    };

    shoppingItems.push(shoppingItem); // add the new item to the shopping list

    console.log(shoppingItems);

    const ionItems = shoppingItems.map(shoppingItem => {  // The map function iterates through each item in the shoppingItems array.
        const ionItem = document.createElement('ion-item'); // For each shoppingItem, it creates a new HTML element (ion-item) and formats the item details into its content.
        ionItem.innerHTML = `${shoppingItem.name} - ${shoppingItem.quantity} - ${shoppingItem.category} - ${getMinutesElapsed(shoppingItem.addedDate)}`;
        return ionItem; // Adds the newly created <ion-item> element to the ionItems array.
    });

    shoppingList.replaceChildren(...ionItems); // Clears all existing child elements of the shoppingList container and replaces them with the new ionItems. 
    countBadge.innerHTML = shoppingItems.length; // Updates the content of the badge element to show the total number of items.
});

function isInputValid() { // function keyword is used to define a reusable block of code.
    return nameInput.value && nameInput.value.trim() !== '' // nameInput is not empty or whitespace-only
        && quantityInput.value && Number(quantityInput.value) > 0 // quantityInput is a positive number
        && categorySelect.value;
}

function getMinutesElapsed(date) {
    const diff = new Date() - date; // Calculates the difference in milliseconds
    const diffInMinutes = diff / (1000 * 60); // Converts milliseconds into minutes
    if (diffInMinutes < 1) {
        return 'less than 1 min ago';
    } else {
        return `${Math.floor(diffInMinutes)} minutes ago`;
    }
}


