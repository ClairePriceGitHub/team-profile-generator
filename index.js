const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const teamArr = [];

createEmployees = () => {
    // Inquirer questions for each employee type
    const questionsManager = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter your employee ID',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter your office number',
        },
    ];

    const questionsTeam = [
        {
            type: 'checkbox',
            name: 'teamOptions',
            message: 'Who would you like to add?',
            choices: ['Engineer', 'Intern', 'Finish building the team']
        },
    ]

    const questionsEngineer = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter email address',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter GitHub username',
        },
    ];

    const questionsIntern = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter email address',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter school name',
        },
    ];

    // Function to allow new employee type selection
    createTeam = () => {
        inquirer.prompt(questionsTeam)
        .then(data => {
            if (data.teamOptions == 'Engineer') {
                createEngineer();
            } else if (data.teamOptions == 'Intern') {
                createIntern();
            } else {
                // fs.writeFile(outputPath, render(team), (err) =>
                // err ? console.log(err) : console.log('Success!')
                // );
            }
        })
    }

    // Functions to create each employee by type starting with manager
    createManager = () => {
        inquirer.prompt(questionsManager)
        .then(data => {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            teamArr.push(manager);
            console.log(teamArr);
            createTeam();
        })
    }
    createManager();

    createEngineer = () => {
        inquirer.prompt(questionsEngineer)
        .then(data => {
            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            teamArr.push(engineer);
            console.log(teamArr);
            createTeam();
        })
    }

    createIntern = () => {
        inquirer.prompt(questionsIntern)
        .then(data => {
            const intern = new Intern(data.name, data.id, data.email, data.school);
            teamArr.push(intern);
            console.log(teamArr);
            createTeam();
        })
    }
}

createEmployees();





// inquirer.prompt(questions)
// .then((data) => {
//     fs.writeFile('./index.html', JSON.stringify(data, null, '\t'), (err) =>
//     err ? console.log(err) : console.log('Success!')
//     );
// })