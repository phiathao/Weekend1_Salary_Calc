// console.log( 'js' );
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
    // console.log( 'jQ' );
    $('#addEmployeeBtn').on('click', addEmployeeFn);
}

function addEmployeeFn(){
    // console.log( 'button work' );
    const notFillArray = []; // contain input that is not fill
    const employeeFilledArray = []; // contain input information
    ['FirstName', 'LastName', 'ID', 'Title', 'Salary'].forEach(function(inputName) { // loop through this array
        let inputIn = '#input'+inputName; // set/reassign class
        // console.log(inputIn);
        if ( $(inputIn).val() == '' ) { // check the reassign class val
            notFillArray.push(` ${inputName}`); // if empty, push which input is empty
        } else {
            employeeFilledArray.push($(inputIn).val()); // if fill push the fill input into array
        }; // end if else
    }); // end loop
    // console.log(employeeFilledArray);
    if ( notFillArray.length > 0 ){ // check if there is a not filled input / every not fill input should increase the length of this array
        alert(notFillArray + ' is not fill'); // alert with the array to tell us which input is not fill
    } else {
        const addingEmployee = new Employee ( // construct new Employee with value from the array
            employeeFilledArray[0],
            employeeFilledArray[1],
            employeeFilledArray[2],
            employeeFilledArray[3],
            employeeFilledArray[4]
            ); // end construct
        console.log(addingEmployee); // check the newly added employee info
        employeeArray.push(addingEmployee); // push the newly added employee into the employeeArray
        displayEmployee(); // run this function
    } // end of if else
    // if ( $('#inputFirstName').val() == '' ||        // ---- code work also but doesn't have alert
    //     $('#inputLastName').val() == '' || 
    //     $('#inputID').val() == '' || 
    //     $('#inputTitle').val() == '' || 
    //     $('#inputSalary').val() == ''
    //     ){
    //     alert('Form not filled');
    // } else {
    // const addingEmployee = new Employee ( // construct new employee with value inside input
    //     $('#inputFirstName').val(), 
    //     $('#inputLastName').val(), 
    //     $('#inputID').val(), 
    //     $('#inputTitle').val(), 
    //     $('#inputSalary').val() );
    // employeeArray.push(addingEmployee); // push new employee into array
    // // console.log(employeeArray);
    // displayEmployee();
    // }
} // end of function

function displayEmployee(){
    // console.log( 'in displayEmployee' );
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
    // console.log( 'inside checkSalary' );
    for ( let employee in employeeArray ) {
        employeeTotalSalary += parseInt(employeeArray[employee].annualSalary);
    }
    console.log(employeeTotalSalary);
    if (employeeTotalSalary > 20000) {
        // console.log('over salary');
        $('#redIfOver').css('background-color', 'red');
    }
    $('#totalSalary').text(`Total Annual Salary: ${employeeTotalSalary}`);
}

function removeEmployeeFunction(){
    const findSalary = $(this).closest('.removeEmployeeClass').find('.tableSalary').text();
    const findEmID = $(this).closest('.removeEmployeeClass').find('.tableID').text();
    // console.log('finding salary', findSalary);
    // console.log('finding ID', findEmID);
    // debugger;
    for ( let employee in employeeArray ) {
        console.log('in employee remove loop');
        if (findSalary == employeeArray[employee].annualSalary && findEmID == employeeArray[employee].id) {
            console.log('in removing employee');
            employeeArray.splice(employee, 1);
        };
    }
    // console.log($(this).closest('.removeEmployeeClass'));
    $(this).parent().closest('.removeEmployeeClass').remove();
    checkSalary();
}
