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
const createTeam = [];

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

const teamOptions = [
    {
        type: 'input',
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





// inquirer.prompt(questions)
// .then((data) => {
//     fs.writeFile('./index.html', JSON.stringify(data, null, '\t'), (err) =>
//     err ? console.log(err) : console.log('Success!')
//     );
// })





function createManager() {
    inquirer.prompt(questionsManager)
    .then(data => {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        createTeam.push(manager);
        console.log(createTeam);
    })
}


function createTeam() {
    inquirer.prompt(teamOptions)
    .then(team => {
        fs.writeFile(outputPath, render(team), (err) =>
        err ? console.log(err) : console.log('Success!')
        );
    })
}



// createManager()

// inquirer.prompt(questionsManager)
// .then(team => {
//     fs.writeFile(outputPath, render(team), (err) =>
//     err ? console.log(err) : console.log('Success!')
//     );
// })