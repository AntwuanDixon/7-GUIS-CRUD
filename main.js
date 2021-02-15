const createBtn = document.querySelector('#create-btn');
const updateBtn = document.querySelector('#update-btn');
const deleteBtn = document.querySelector('#delete-btn');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const rolodexList = document.querySelector('#rolodex-list')
const filter = document.querySelector('.filter')

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
    rolodex.push(person);
    rolodex.sort(function (a, b) {
        if (a.lastName <= b.lastName) {
            if (a.firstName < b.firstName) {
                return -1;
            } else {
                return 1;
            }
        } else if (a.lastName > b.lastName) {
            return 1;
        } else {
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
    })
}

function removeFromRolodex () {
    var selectedPerson = parseInt(rolodexList.selectedOptions[0].dataset.person);
    rolodex.splice(selectedPerson, 1);
    clearInputs();
}

deleteBtn.addEventListener('click', function () {
    removeFromRolodex();
    var selectedPerson = rolodexList.selectedOptions[0];
    rolodexList.removeChild(selectedPerson);
})

updateBtn.addEventListener('click', function () {
    var selectedPerson = parseInt(rolodexList.selectedOptions[0].dataset.person);
    rolodex.splice(selectedPerson, 1);
    Entry();
    clearInputs();
})

filter.addEventListener('input', function () {
    filterEntries()
})

function filterEntries () {
    clearRolodex();
    rolodex.forEach(function(entry, index) {
        var fullName = entry.lastName + ', ' + entry.firstName;
        var filterCaps = filt.value.toLowerCase();
        
        if (fullName.includes(filter.value)) {
            appendPeople(entry, index)
        }
    })
}