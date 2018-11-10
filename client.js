console.log( 'js' );
$(document).ready(readyJQ);

class Employee {
    constructor ( firstName, lastName, emID, emTitle, emAnnualSalary) {
        this.name = firstName,
        this.last = lastName,
        this.id = emID,
        this.title = emTitle,
        this.annualSalary = emAnnualSalary
    }
}

const employeeArray = [];

function readyJQ(){
    console.log( 'jQ' );
    $('#addEmployeeBtn').on('click', addEmployeeFn);
}

function addEmployeeFn(){
    console.log( 'button work' );
    if( $('#inputFirstName').val() == '' || $('#inputLastName').val() == '' || $('#inputID').val() == '' || $('#inputTitle').val() == '' || $('#inputSalary').val() == ''){
        alert(' Form not filled');
    } else {
    const addingEmployee = new Employee ( $('#inputFirstName').val(), $('#inputLastName').val(), $('#inputID').val(), $('#inputTitle').val(), $('#inputSalary').val() );
    employeeArray.push(addingEmployee);
    console.log(employeeArray);
    displayEmployee();
    }
}

function displayEmployee(){
    console.log( 'in displayEmployee' );
    $('#tableOfEmployees').empty();
    for ( let employee in employeeArray ) {
        $('#tableOfEmployees').append(
            `<tr class="row removeEmployeeClass">
            <td class="col-sm"><button class="removeEmployee">Remove</button>${employeeArray[employee].name}</td>
            <td class="col-sm">${employeeArray[employee].last}</td>
            <td class="col-sm tableID">${employeeArray[employee].id}</td>
            <td class="col-sm">${employeeArray[employee].title}</td>
            <td class="col-sm tableSalary">${employeeArray[employee].annualSalary}</td>
            </tr>`);
    }
    checkSalary();
    $('.removeEmployee').on('click', removeEmployeeFunction);
}

function checkSalary(){
    let employeeTotalSalary = 0;
    console.log( 'inside checkSalary' );
    for ( let employee in employeeArray ) {
        employeeTotalSalary += parseInt(employeeArray[employee].annualSalary);
    }
    console.log(employeeTotalSalary);
    if (employeeTotalSalary > 20000) {
        console.log('over salary');
        $('#redIfOver').css('background-color', 'red');
    }
    $('#totalSalary').text(`Total Annual Salary: ${employeeTotalSalary}`);
}

function removeEmployeeFunction(){
    let findSalary = $(this).closest('.removeEmployeeClass').find('.tableSalary').text();
    let findEmID = $(this).closest('.removeEmployeeClass').find('.tableID').text();
    console.log('finding salary', findSalary);
    console.log('finding ID', findEmID);
    // debugger;
    for ( let employee in employeeArray ) {
        console.log('in emplyee remove loop');
        if (findSalary == employeeArray[employee].annualSalary && findEmID == employeeArray[employee].id) {
            console.log('in removing employee');
            employeeArray.splice(employee, 1);
        };
    }
    // console.log($(this).closest('.removeEmployeeClass'));
    $(this).parent().closest('.removeEmployeeClass').remove();
    checkSalary();
}
