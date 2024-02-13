const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the team manager's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the team manager's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the team manager's email",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the team manager's office number?",
  },
];

const menu = [
  {
    type: "list",
    name: "employee",
    message: "Which type of team member would you like to add?",
    choices: ["Engineer", "Intern", "I've finished building the team"],
  },
];
const promptUser = () => {
  inquirer.prompt(teamQuestions);
  inquirer.prompt(menu);
};

async function init() {
  try {
    const userAnswers = await promptUser();
    const render = render(userAnswers);
    await writeFileAsync(outputPath, render);

    // In case of error...
  } catch (error) {
    console.log(error);
  }
}

// function call to initialize program
init();
