const fs = require("fs");
const inquirer = require("inquirer");
inquirer
  .prompt([
    {
      name: "projectTitle",
      type: "input",
      message: "What is your project title?",
    },
    {
      name: "projectDescription",
      type: "input",
      message: "What is your project's description?",
    },
    {
      name: "projectContributorName",
      type: "input",
      message: "Who contributed to this project?",
    },
    {
      name: "projectContributorURL",
      type: "input",
      message: "What is thier personal Github URL?",
      validate: function (input) {
        const valid = input.startsWith("www.");
        return valid || "Please enter a valid URL.";
      },
    },
    {
      name: "licenseType",
      type: "checkbox",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
      message: "What kind of license would you like to add?",
    },
  ])
  .then((answers) => {
    const theMarkDown = generateMarkDown(answers);
    console.log(answers.projectTitle);
    fs.writeFile("README.MD", theMarkDown, (err) =>
      err ? console.error(err) : console.log("Success!")
    );
    function renderLicenseType(license) {
      if (license === true) return `This project a uses ${license} license.`;
      return "This project does not use a license";
    }
    renderLicenseType();
  });

const generateMarkDown = (markdown) => {
  return `# ${markdown.projectTitle}

![${markdown.licenseType}](https://img.shields.io/badge/License-${markdown.licenseType}-blue.svg)

## Description:
${markdown.projectDescription}
    
## Project Contributors:
[${markdown.projectContributorName}](${markdown.projectContributorURL})

## License:
This project uses a ${markdown.license} license.`;
};
