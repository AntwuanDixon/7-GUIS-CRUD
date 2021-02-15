const createBtn = document.querySelector('#create-btn');
const updateBtn = document.querySelector('#update-btn');
const deleteBtn = document.querySelector('#delete-btn');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const rolodexList = document.querySelector('#rolodex-list')
const filter = document.querySelector('.filter')
const messageContainer =  document.querySelector('.message-container')

var rolodex = [];

function personFactory (firstName, lastName) {
    return {firstName, lastName}
}

createBtn.addEventListener('click', function () {
    Entry ();
})

function Entry () {
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const newPerson = personFactory(firstName, lastName);
    
    addToRolodex(newPerson)
}

function addToRolodex (person) {
    console.log('cycle')
    rolodex.push(person);
    rolodex.sort(function (a, b) {
        if (a.lastName < b.lastName) {
            return -1;
        } else if (a.lastName > b.lastName) {
            return 1;
        } else {
            if (a.firstName < b.firstName) {
                return -1;
            } else if (a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        }
    })

    clearRolodex();
    clearInputs();
    rolodex.forEach(appendPeople)
    filterEntries()
} 

function clearInputs () {
    lastNameInput.value = '';
    firstNameInput.value = '';
}

function removeChildren (entry) {
    rolodexList.removeChild(entry);
}

function clearRolodex () {
    const personEntries = document.querySelectorAll('.person-entry')
    personEntries.forEach(removeChildren);
}

function appendPeople (person, index) {
    var fullName = person.lastName + ', ' + person.firstName;
    var listItem = document.createElement('option');
    listItem.innerHTML = fullName;
    listItem.classList = "person-entry";
    listItem.dataset.person = index;
    listItem.dataset.role = 'option';
    rolodexList.appendChild(listItem);
    listItem.addEventListener('click', function () {
        lastNameInput.value = person.lastName;
        firstNameInput.value = person.firstName;
        const errorMessages = document.querySelectorAll('.error-message')
        errorMessages.forEach(function(message) {
            message.remove();
        })
    })
}

function removeFromRolodex () {
    var selectedPerson = parseInt(rolodexList.selectedOptions[0].dataset.person);
    rolodex.splice(selectedPerson, 1);
    clearInputs();
}

deleteBtn.addEventListener('click', function () {
    if (rolodexList.selectedOptions[0] !== undefined) {
        removeFromRolodex();
        var selectedPerson = rolodexList.selectedOptions[0];
        rolodexList.removeChild(selectedPerson);
    } else {
        displayErrorMessage();
    }
})

updateBtn.addEventListener('click', function () {
    if (rolodexList.selectedOptions[0] !== undefined) {
        var selectedPerson = parseInt(rolodexList.selectedOptions[0].dataset.person);
        rolodex.splice(selectedPerson, 1);
        Entry();
        clearInputs();
    } else {
        displayErrorMessage();
    }
})

filter.addEventListener('input', function () {
    filterEntries()
})

function displayErrorMessage () {
    const errorMessages = document.querySelectorAll('.error-message')
    errorMessages.forEach(function(message) {
        message.remove();
    })
    var errorMessage = document.createElement('p');
    errorMessage.innerHTML = "Please select an entry.";
    errorMessage.classList = "error-message";
    messageContainer.appendChild(errorMessage);
}

function filterEntries () {
    clearRolodex();
    rolodex.forEach(function(entry, index) {
        var filterNoCaps = filter.value.toLowerCase();
        var entryNoCaps = entry.lastName.toLowerCase();

        if (entryNoCaps.startsWith(filterNoCaps)) {
            appendPeople(entry, index)
        }
    })
}