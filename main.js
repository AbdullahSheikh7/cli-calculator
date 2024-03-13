#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradientString from "gradient-string";
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";
let continueMore = true;
let result = 0;
const sleep = async (ms = 2000) => {
    await new Promise((r) => {
        setTimeout(r, ms);
    });
};
const inputs = async () => {
    if (result === 0) {
        const answer = await inquirer.prompt([
            {
                name: "number1",
                type: "input",
                message: "Enter the first number: ",
                validate: function (value) {
                    if (/[\D]/.test(value)) {
                        return "Enter a valid number";
                    }
                    else {
                        return true;
                    }
                },
            },
            {
                name: "number2",
                type: "input",
                message: "Enter the second number: ",
                validate: function (value) {
                    if (/[\D]/.test(value)) {
                        return "Enter a valid number";
                    }
                    else {
                        return true;
                    }
                },
            },
            {
                name: "operation",
                type: "list",
                message: "Choose an operation: ",
                choices: ["+", "-", "*", "/"],
            },
        ]);
        return answer;
    }
    else {
        const answer = await inquirer.prompt([
            {
                name: "number2",
                type: "input",
                message: "Enter the second number: ",
                validate: function (value) {
                    if (/[\D]/.test(value)) {
                        return "Enter a valid number";
                    }
                    else {
                        return true;
                    }
                },
            },
            {
                name: "operation",
                type: "list",
                message: "Choose an operation: ",
                choices: ["+", "-", "*", "/"],
            },
        ]);
        return answer;
    }
};
const calculate = async () => {
    let input = await inputs();
    let expression;
    if (result == 0) {
        expression = input.number1 + input.operation + input.number2;
    }
    else {
        expression = result + input.operation + input.number2;
    }
    const spinner = createSpinner("Calculating....").start();
    await sleep(1000);
    spinner.success({ text: chalk.yellowBright(eval(expression)) });
    const whatNext = await inquirer.prompt([
        {
            name: "whatNext",
            type: "list",
            message: "What next?",
            choices: [
                "Clear all and continue",
                "Continue with the answer as the first number",
                "Exit",
            ],
        },
    ]);
    if (whatNext.whatNext === "Continue with the answer as the first number") {
        result = eval(expression);
    }
    else if (whatNext.whatNext === "Clear all and continue") {
        result = 0;
    }
    else if (whatNext.whatNext === "Exit") {
        continueMore = false;
    }
};
figlet("CLI Calculator", (error, data) => {
    console.log(gradientString.pastel.multiline(data));
});
await sleep(100);
let developer = chalkAnimation.rainbow("Made by Abdullah");
await sleep(1000);
developer.stop();
let github = chalkAnimation.neon("github.com/abdullahsheikh7/");
await sleep(1000);
github.stop();
do {
    await calculate();
} while (continueMore);
