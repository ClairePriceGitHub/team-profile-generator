const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const emailValidator = require('email-validator');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];

const createTeam = () => {
    // Inquirer questions for each employee type
    const questionsManager = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the Team Manager',
            validate: function (name) {
                let valid = /^[a-zA-Z]+$/.test(name)
                return valid || 'Please enter a valid name'
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employee ID of the Team Manager',
            validate: function (id) {
                valid = Number.isInteger(+id)
                return valid || 'Please enter a valid whole number'
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of the Team Manager',
            validate: function (email) {
                valid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
                return valid || 'Please enter a valid email address'
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the office number of the Team Manager',
            validate: function (officeNumber) {
                const num = +officeNumber
                valid = Number.isInteger(num) 
                if (valid && num > 0 && num <= 10) {
                    return valid
                } else {
                    return 'Please enter an office number between 1 and 10'
                }
            }
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
            message: 'Enter the name of the Engineer',
            validate: function (name) {
                valid = /^[a-zA-Z]+$/.test(name)
                return valid || 'Please enter a valid name'
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employee ID of the Engineer',
            validate: function (id) {
                valid = Number.isInteger(+id)
                return valid || 'Please enter a valid whole number'
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of the Engineer',
            validate: function (email) {
                valid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
                return valid || 'Please enter a valid email address'
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter the GitHub username of the Engineer',
        },
    ];

    const questionsIntern = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the Intern',
            validate: function (name) {
                valid = /^[a-zA-Z]+$/.test(name)
                return valid || 'Please enter a valid name'
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employee ID of the Intern',
            validate: function (id) {
                valid = Number.isInteger(+id)
                return valid || 'Please enter a valid whole number'
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of the Intern',
            validate: function (email) {
                valid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
                return valid || 'Please enter a valid email address'
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter the school name of the Intern',
            validate: function (name) {
                valid = /^[a-zA-Z]+$/.test(name)
                return valid || 'Please enter a valid school name'
            }
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
                fs.writeFile(outputPath, render(team), (err) =>
                err ? console.log(err) : console.log('Success, your HTML file has been generated!')
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








