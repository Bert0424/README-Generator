import inquirer from 'inquirer';
import fs from 'fs';
import generateMarkdown from './utils/generateMarkdown.js';

// Array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    validate: (input) => (input ? true : 'Project title is required.'),
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:',
    validate: (input) => (input ? true : 'Description is required.'),
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide installation instructions:',
    default: 'npm install',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide usage information:',
    validate: (input) => (input ? true : 'Usage information is required.'),
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None'],
    default: 'MIT',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Provide contribution guidelines:',
    default: 'Contributions are welcome! Please open an issue or submit a pull request.',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide test instructions:',
    default: 'npm test',
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username:',
    validate: (input) => (input ? true : 'GitHub username is required.'),
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
    validate: (input) => (input ? true : 'Email address is required.'),
  },
];

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error('Error writing README file:', err);
      return;
    }
    console.log('README.md has been generated successfully!');
  });
}

// Function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const markdownContent = generateMarkdown(answers);
      writeToFile('README.md', markdownContent);
    })
    .catch((error) => {
      console.error('Error during prompt:', error);
    });
}

// Function call to initialize app
init();