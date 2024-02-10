const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "./team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];

const createTeam = () => {
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
    ];

    const questionsEngineer = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter engineer name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter engineer employee ID',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter engineer email address',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter engineer GitHub username',
        },
    ];

    const questionsIntern = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter intern name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter intern employee ID',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter intern email address',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter intern school name',
        },
    ];

    // Function to allow new employee type selection
    const createTeamMember = () => {
        inquirer.prompt(questionsTeam)
        .then(data => {
            if (data.teamOptions == 'Engineer') {
                createEngineer();
            } else if (data.teamOptions == 'Intern') {
                createIntern();
            } else {
                fs.writeFile('./team.html', render(team), (err) =>
                err ? console.log(err) : console.log('Success!')
                );
            }
        })
    };

    // Functions to create each employee by type starting with manager
    const createManager = () => {
        inquirer.prompt(questionsManager)
        .then(data => {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            team.push(manager);
            createTeamMember();
        })
    };
    createManager();

    const createEngineer = () => {
        inquirer.prompt(questionsEngineer)
        .then(data => {
            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            team.push(engineer);
            createTeamMember();
        })
    };

    const createIntern = () => {
        inquirer.prompt(questionsIntern)
        .then(data => {
            const intern = new Intern(data.name, data.id, data.email, data.school);
            team.push(intern);
            createTeamMember();
        })
    };
};

createTeam();








