// Girl constructor
function Girl(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
}
// UI constructor
function UI() {};

//Add girl to list
UI.prototype.addGirlToList = function(girl) {
        const list = document.getElementById('girls-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
                      <td>${girl.name}</td>
                      <td>${girl.lastName}</td>
                      <td>${girl.age}</td>
                      <td><a href="#" class="delete">X</a></td>
    `;
        list.appendChild(row);
    }
    //Show alert
UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    // Text node
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#girl-form');
    //Insert alert
    container.insertBefore(div, form);
    // Disappear 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

//Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('name').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('age').value = '';
}

// Event listeners for add girl
document.getElementById('girl-form').addEventListener('submit',
    function(e) {
        //Get form values
        const name = document.getElementById('name').value,
            lastName = document.getElementById('lastName').value,
            age = document.getElementById('age').value
            // instantiate girl
        const girl = new Girl(name, lastName, age);
        //Instantiate UI 
        const ui = new UI();
        //Validate 
        if (name === '' || lastName === '' || age === '') {
            //Error alert
            ui.showAlert('Заполните все поля', 'error');
        } else {
            // Add girl to list
            ui.addGirlToList(girl);
            // Show succes
            ui.showAlert('Крепость пала', 'success');
            //Clear fields
            ui.clearFields();
        }
        e.preventDefault();
    });

// Delete girl
UI.prototype.deleteGirl = function(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    //Event listener for delete
document.getElementById('girls-list').addEventListener('click', function(e) {
    const ui = new UI();
    // Show Alert
    ui.showAlert('Минус одна', 'success');
    //Delete girl
    ui.deleteGirl(e.target);
    e.preventDefault();
});