const fs = require("fs");
const Employee = require("./Employee")


class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }
    getRole(){
        return "Intern";
    }
    getSchool(){
        return this.school;
    }
}
   



module.exports = Intern












// // if (role === 'intern'){
// //     generateIntern();
// // }

// const generateIntern = async () => {
//     await intern.generateEmployee();
//     await newQuestion();

// }

// // const generateSchool = async () => {
// //     await newQuestion();
// // }

// const execute = async () => {
//     await generateIntern();
//     //await generateSchool();


// }
// execute();

// const newQuestion = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'school',
//             message: "Where did the employee go to school?"
//         }
//     ])
//         .then((answer) => {

//             const school = answer.school;

//             const _intern = new Employee(name, id, email, role, school);
//             console.log(_intern);
//         })


// }



//newQuestion();
