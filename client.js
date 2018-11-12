$(document).ready(readyJQ);

class Employee {
    constructor(firstName, lastName, emID, emTitle, emAnnualSalary) {
        this.name = firstName,
            this.last = lastName,
            this.id = emID,
            this.title = emTitle,
            this.annualSalary = emAnnualSalary
    }
}

const employeeArray = [];
let notFillArray = []; // contain input that is not fill / reassign in line 21 function
let employeeFilledArray = [];  // contain input information / reassign in line 21 function

function readyJQ() {
    $('#addEmployeeBtn').on('click', addEmployeeFn); // line 21
}

function addEmployeeFn() { // watching for click to do this function
    notFillArray = []; // emptying array
    employeeFilledArray = []; // emptying array
    ['FirstName', 'LastName', 'ID', 'Title', 'Salary'].forEach(function (inputName) { // loop through this array
        let inputIn = '#input' + inputName; // set/assign array to be a class exist in element
        if ($(inputIn).val() == '') { // check the assigned inputIn/class 
            notFillArray.push(` ${inputName}`); // if empty, push which input is empty
        } else {
            employeeFilledArray.push($(inputIn).val()); // if fill push the fill input into array
        }; // end if else / check
    }); // end loop
    if (notFillArray.length > 0) { // check if there is a not filled input / every not fill input should increase the length of this array
        return alert(notFillArray + ' is not fill'); // alert with the array to tell us which input is not fill
    } if (getArrayIDFunction() == true) { // check if input exist in employeeArray already // line 83
        return alert('Employee ID already exist'); // will alert 
    } else {
        const addingEmployee = new Employee( // construct new Employee with value from the array
            employeeFilledArray[0],
            employeeFilledArray[1],
            employeeFilledArray[2],
            employeeFilledArray[3],
            employeeFilledArray[4]
        ); // end constructor
        employeeArray.push(addingEmployee); // push the newly added employee into the employeeArray
        ['FirstName', 'LastName', 'ID', 'Title', 'Salary'].forEach(function (inputName) { // loop through this array to clear input
            let inputIn = '#input' + inputName; // set/assign array to be a class exist in element
            $(`${inputIn}`).val(''); // clear this element value
        }); // end loop
    } // end of if else
    displayEmployee(); // run displayEmployee fn
} // end of function

function checkSalary() {
    let employeeTotalSalary = 0;    // counter
    for (let employee in employeeArray) {       // loop through all employee / employeeArray
        employeeTotalSalary += parseInt(employeeArray[employee].annualSalary); // calculate salary total
    }
    if (employeeTotalSalary / 12 > 20000) {
        $('#totalSalary').parent().css('background-color', 'red'); // if salary over 20000 display red
    } else if (employeeTotalSalary / 12 <= 20000) {
        $('#totalSalary').parent().css('background-color', ''); // if salary under 20000 remove background color
    }
    $('#totalSalary').text(`Total Monthly Salary: $${(employeeTotalSalary / 12).toFixed(2)}`); // display salary total / 12
}

function displayEmployee() {
    $('#tableOfEmployees').empty(); // clear table
    for (let employee in employeeArray) { // for each employee inside employeeArray append their property into element
        $('#tableOfEmployees').append(
            `<tr class="row removeEmployeeClass">
            <td class="col">${employeeArray[employee].name}</td>
            <td class="col">${employeeArray[employee].last}</td>
            <td class="col tableID">${employeeArray[employee].id}</td>
            <td class="col">${employeeArray[employee].title}</td>
            <td class="col tableSalary">${employeeArray[employee].annualSalary}</td>
            <td class="col text-center"><button class="removeEmployee btn btn-sm btn-outline-warning">Remove</button></td>
            </tr>`);
    }
    checkSalary(); // re check the salary
    $('.removeEmployee').on('click', removeEmployeeFunction); // after the display, we watch for this click action / if click do this function
}

function getArrayIDFunction() { // function to check if there is duplicate ID
    for (i in employeeArray) {
        if ($('#inputID').val() == employeeArray[i].id) {
            return true;
        }
    }
    return false;
}

function removeEmployeeFunction() { // when remove is click
    const findSalary = $(this).closest('.removeEmployeeClass').find('.tableSalary').text(); // look for text/ salary in table
    const findEmID = $(this).closest('.removeEmployeeClass').find('.tableID').text(); // look for text/ id in table
    for (let employee in employeeArray) { // loop through array to remove
        if (findSalary == employeeArray[employee].annualSalary && findEmID == employeeArray[employee].id) { // doesn't need the annualSalary check because we already made sure that employee.id are never the same
            employeeArray.splice(employee, 1); // remove from employeeArray if clicked row match id/salary with it
        };
    }
    $(this).parent().closest('.removeEmployeeClass').remove(); // remove from html
    checkSalary(); // re check the salary
}