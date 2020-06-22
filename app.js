const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require('./lib/htmlRenderer');
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "index.html");



const employees = [];
const generateEmployee =  () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the employee's id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the employee's email?"
        },
        {
            type: 'list',
            name: 'role',
            choices: ['Manager', 'Intern', 'Engineer']
        },
        {
            type: "input",
            name: 'school',
            when: function (answers) {
                return answers.role === 'Intern';
            },
            message: 'what school did you go to?'
        },
        {
            type: "input",
            name: 'officeNumber',
            when: function (answers) {
                return answers.role === 'Manager';
            },
            message: 'what is you office number?'
        },
        {
            type: "input",
            name: 'github',
            when: function (answers) {
                return answers.role === 'Engineer';
            },
            message: 'What is your github?'
        },
        {
            type: "list",
            name:"complete",
            message: "Is your roster complete?",
            choices: ['yes', 'no']
        }
    ])
        .then((answer) => {
            const name = answer.name;
            const id = answer.id;
            const email = answer.email;
            const role = answer.role;
            const school = answer.school;
            const github = answer.github;
            const officeNumber = answer.officeNumber;
            const complete = answer.complete;

            
            if (answer.role === "Intern") {
                const _intern = new Intern(name, id, email, school);
               employees.push(_intern);
            } else if (answer.role === "Manager") {
                const _manager = new Manager(name, id, email, officeNumber);
                employees.push(_manager);
            } else if (answer.role === "Engineer") {
                const _engineer = new Engineer(name, id, email, github)
                employees.push(_engineer);

            }
            if(complete === "yes"){
                console.log(employees)
               //render(employees);
            }else{
                generateEmployee();
              
            }

           buildTeam();
            


        })
}


const buildTeam = () =>{
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath,render(employees), "UTF-8");
}

generateEmployee();






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```