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
      name: "projectInsallation",
      type: "input",
      message: "Any installation instructions?",
    },
    {
      name: "projectUseage",
      type: "input",
      message: "Any notes on project useage?",
    },
    {
      name: "projectContribution",
      type: "input",
      message: "Do you have any project contributions to document?",
    },
    {
      name: "projectTests",
      type: "input",
      message: "Any testing you ran to document?",
    },
    {
      name: "licenseType",
      type: "list",
      choices: ["MIT", "APACHE2.0", "GPL3.0", "BSD3", "None"],
      message: "What kind of license would you like to add?",
    },
    {
      name: "githubUsername",
      type: "input",
      message: "What is your Github username?",
    },
    {
      name: "githubRepo",
      type: "input",
      message: "What is the link to the repo?",
      validate: function (input) {
        const valid = input.startsWith("https://");
        return valid || "Please enter a valid URL.";
      },
    },
    {
      name: "githubDeployedLink",
      type: "input",
      message: "What is the link to the application?",
      validate: function (input) {
        const valid = input.startsWith("https://");
        return valid || "Please enter a valid URL.";
      },
    },
    {
      name: "emailAddress",
      type: "input",
      message: "What is your email address?",
      default: "name@gmail.com",
    },
    {
      name: "githubProfile",
      type: "input",
      message: "What is the link to your github profile?",
      validate: function (input) {
        const valid = input.startsWith("https://");
        return valid || "Please enter a valid URL.";
      },
    },
    {
      name: "screenshotAltText",
      type: "input",
      message: "Enter in the alt text for your application screenshot.",
    },
    {
      name: "appScreenshot",
      type: "input",
      message: "Type the path to a screenshot of your application.",
    },
  ])
  .then((answers) => {
    const theMarkDown = generateMarkDown(answers);
    console.log(answers.projectTitle);
    console.log(answers.licenseType);
    fs.writeFile("README.MD", theMarkDown, (err) =>
      err ? console.error(err) : console.log("Success!")
    );
  });
function renderLicenseType(type) {
  if (type !== "None") {
    return `![${type}](https://img.shields.io/badge/License-${type}-blue.svg)`;
  } else {
    return "";
  }
}
function renderLicenseField(type) {
  if (type !== "None") {
    return `
## License:
This project is covered under ${type} license.`;
  } else {
    return "";
  }
}

const generateMarkDown = (markdown) => {
  return `# ${markdown.projectTitle}
${renderLicenseType(markdown.licenseType)}

## Table of Contents:
- [Description](#description)
- [Installation](#installation)
- [Useage](#useage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Screenshot](#screenshot)
- [Links](#links)
- [Questions](#questions)

## Description:
${markdown.projectDescription}

## Installation:
${markdown.projectInsallation}

## Useage:
${markdown.projectUseage}

## Contributing:
${markdown.projectContribution}

## Tests:
${markdown.projectTests}

${renderLicenseField(markdown.licenseType)}

## Screenshot:
![application screenshot](${markdown.appScreenshot})

## Links:
- Project repo: [${markdown.githubUsername}/repo](${markdown.githubRepo})
- Deployed application: [${markdown.githubUsername}/page](${
    markdown.githubDeployedLink
  })

## Questions:
- Email address: ${markdown.emailAddress}
- Github profile: [github.com/${markdown.githubUsername}](${
    markdown.githubProfile
  })
`;
};
