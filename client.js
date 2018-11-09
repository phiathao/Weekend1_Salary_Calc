console.log( 'js' );
$(document).ready(readyJQ);

class Employee {
    constructor ( firstName, lastName, emID, emTitle, emAnnualSalery) {
        this.name = firstName,
        this.last = lastName,
        this.id = emID,
        this.title = emTitle,
        this.annualSalery = emAnnualSalery
    }
}

let employeeArray = [];

function readyJQ(){
    console.log( 'jQ');
    $('#addEmployeeBtn').on('click', addEmployeeFn);
}

function addEmployeeFn(){
    console.log( 'button work' );
}