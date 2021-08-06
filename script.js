'use-strict'

const gradeObject = {
    'A': 4,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'D': 1.0,
    'F': 0,
    'WF': 0.0
}
let gradeArray = []
let creditArray = []
const grades = document.getElementsByName('grade')
const credits = document.getElementsByName('credit')
let numOfFields = document.getElementsByName('inputfield').length
const deletes = document.getElementsByName('delete')


// creates ids for grade, credit, and delete based on the number of input field the user specifies
const evaluate = function () {
    let x = 0;
    while (x < numOfFields) {
        grades[x].id = `grade${x}`
        credits[x].id = `credit${x}`
        deletes[x].id = `delete${x}`
        x++
    }
}
// Function is called to evaluate number of input fields on page at initial load
evaluate()


const calculate = function () {

    evaluate()

    // puts grades and credits into arrays 
    for (let i = 0; i < numOfFields; i++) {
        for (grade of grades) {
            gradeArray.push(grade.value)
        }
        for (credit of credits) {
            creditArray.push(Number(credit.value))
        }
    }

    // compares grades to gradeObject to get actual values. Does it by putting in temporary array 

    const tempGradeArray = []

    for (let j = 0; j < gradeArray.length; j++) {
        tempGradeArray.push(gradeObject[gradeArray[j]])
    }

    gradeArray = tempGradeArray

    // total num of credit hours
    let creditTotal = 0
    for (let i = 0; i < creditArray.length; i++) {
        creditTotal += creditArray[i]
    }

    // Calculates quality points
    let sum = 0;
    for (let i = 0; i < gradeArray.length; i++) {
        sum += gradeArray[i] * creditArray[i]
    }
    // returns arrays to default. ensures new calculation with each click
    function clearDefault() {
        gradeArray = []
        creditArray = []
    } clearDefault()

    gpa(sum, creditTotal)
}

const gpa = function (sum, creditTotal) {
    // Calculates GPA 

    let finalGPA = (sum / creditTotal).toFixed(2)

    document.getElementById('gpa').innerHTML = finalGPA

    // Check for standing
    if (finalGPA >= 3.5 && finalGPA < 3.8) {
        document.getElementById('standing').innerHTML = 'Deans List'
    } else if (finalGPA >= 3.8) {
        document.getElementById('standing').innerHTML = 'Presidents List'
    } else if (finalGPA < 2.0) {
        document.getElementById('standing').innerHTML = 'Bad Standing'
    } else {
        document.getElementById('standing').innerHTML = 'Good Standing'
    }
}

// event listner for calculate button which calls the calculate function
document.querySelector('#calculate').addEventListener('click', calculate)


// adding extra input fields
document.getElementById('add').addEventListener('click', function () {
    if (numOfFields < 10) {
        numOfFields++
        let newInput = document.createElement('div')
        newInput.id = `inputfield${numOfFields}`
        newInput.innerHTML = `<select name="grade" 
        class="block w-24 mr-2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:shadow-outline">
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
        <option value="WF">WF</option>
    </select>
    <select name="credit" 
        class="block w-24 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:shadow-outline">
        <option value="4">4.0</option>
        <option value="3">3.0</option>
        <option value="2">2.0</option>
        <option value="1">1.0</option>
        <option value="0">0.0</option>
    </select> 
    <button name="delete" 
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-2"><i class="fas fa-trash-alt"></i>
                </button>`
        newInput.className = 'flex justify-center m-3'
        newInput.setAttribute = ("name", "inputfield")
        document.getElementById('inputs').appendChild(newInput)
        evaluate()
        deleteFunc()
    }
})

// refresh button
document.getElementById('refresh').addEventListener('click', () => {
    window.location = window.location
})


// delete button
const deleteFunc = function () {
    for (let i = 0; i < deletes.length; i++) {
        document.getElementById(`delete${i}`).addEventListener('click', function () {
            let delId = this.parentNode.id
            document.getElementById(delId).remove()
            numOfFields--
        })
    }
}
// Function is called to add functionality to all delete buttons on page
deleteFunc()
