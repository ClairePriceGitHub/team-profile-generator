const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// Initialise array to collection employee objects
const team = [];


// Validation functions for questions input
const validateName = () => ({
    validate: function (name) {
        const valid = /^[A-Z][a-zA-Z]+$/.test(name)
        return valid || 'Please enter a valid name starting with a capital eg: Jacob'
    }
})

const validateId = () => ({
    validate: function (id) {
        const valid = /^[A-Z][0-9]{3}/.test(id)
        return valid || 'Please enter valid employee ID in the format: A100'
    }
})

const validateEmail = () => ({
    validate: function (email) {
        const valid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
        return valid || 'Please enter a valid email address'
    }
})

const validateOfficeNum = () => ({
    validate: function (officeNumber) {
        const num = +officeNumber
        const valid = Number.isInteger(num) 
        if (valid && num > 0 && num <= 10) {
            return valid
        } else {
            return 'Please enter an office number between 1 and 10'
        }
    }
})

const validateSchool = () => ({
    validate: function (name) {
        const valid = /^[a-zA-Z]+$/.test(name)
        return valid || 'Please enter a valid school name'
    }
})


// Function to create the team objects
const createTeam = () => {

    // Inquirer questions for each employee type
    const questionsTeam = [
        {
            type: 'checkbox',
            name: 'teamOptions',
            message: 'Who would you like to add?',
            choices: ['Engineer', 'Intern', 'Finish building the team']
        },
    ];

    const questionsManager = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the Team Manager',
            ...validateName(),
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employee ID of the Team Manager',
            ...validateId(),
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of the Team Manager',
            ...validateEmail(),
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the office number of the Team Manager',
            ...validateOfficeNum(),
        },
    ];

    const questionsEngineer = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the Engineer',
            ...validateName(),
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employee ID of the Engineer',
            ...validateId(),
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of the Engineer',
            ...validateEmail(),
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
            ...validateName(),
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the employee ID of the Intern',
            ...validateId(),
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of the Intern',
            ...validateEmail(),
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter the school name of the Intern',
            ...validateSchool(),
        },
    ];

    // Function to allow new employee type selection and write HTML file when finished
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








