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
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a basic summary of the project and what solutions it provides'
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
    }
    {
      type: 'list',
      message: 'Which license information will you include?',
      name: 'contact',
      choices: ['email', 'phone', 'telekinesis'],
    },
  ]);

const generateHTML = (answers) =>
`${answers.location}.</p>
`;

promptUser()
  .then((answers) => writeFileAsync('README.md', generateHTML(answers)))
  .then(() => console.log('README.md generated successfully.'))
  .catch((err) => console.error(err));
