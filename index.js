const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type:'input',
      name:'username',
      message: 'What is your GitHub username name?'
    },
    {
      type: 'input',
      name: 'project',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a basic summary of the project:'
    },
    { 
      type: 'input',
      name: 'credits',
      message: 'Comments on any additional contributors (beyond yourself) to this project:;'
    },
    {
      type: 'input',
      name: 'installation',
      message: 'What are the steps required to install your project?'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide any instructions and examples for use.'
    },
    {
      type: 'list',
      message: 'Which license information will you include?',
      name: 'license',
      choices: ['MIT', 'GNU', 'APACHE'],
    },
  ]);

let generateREADME = (answers) =>
`
# ${answers.project}

## Table of Contents
* [About](#about)
* [Credits](#credits)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## About
${answers.description}

## Credits
Project created by @${answers.username}. ${answers.credits}

## Installation
${answers.installation}

## Usage 
${answers.usage} 

## License
${answers.license}
`

promptUser()
  .then((answers) => writeFileAsync('README.md', generateREADME(answers))
  .then(() => console.log('README.md generated successfully.'))
  .catch((err) => console.error(err)))

