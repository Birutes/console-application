const chalk = require("chalk");
const argv = require("yargs");
const inquirer = require('inquirer');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

var jokes = [
    {question: "Dad, did you get a haircut?", punchline: "No, I got them all cut!"},
    {question: "How do you get a squirrel to like you?", punchline: "Act like a nut."},
    {question: "Why don't eggs tell jokes?", punchline: "They'd crack each other up."},
    {question: "What do you call someone with no body and no nose?", punchline: "Nobody knows."},
    {question: "Why couldn't the bicycle stand up by itself?", punchline: "It was two tired."},
    {question: "What kind of shoes do ninjas wear?", punchline: "Sneakers!"},
    {question: "How does a penguin build its house?", punchline: "Igloos it together."},
    {question: "Why did the math book look so sad?", punchline: "Because of all of its problems!"},
    {question: "How many tickles does it take to make an octopus laugh?", punchline: "Ten tickles."},
    {question: "Did you hear about the guy who invented the knock-knock joke?", punchline: "He won the 'no-bell' prize"},
]

localStorage.setItem('jokes',  JSON.stringify(jokes));

function getJoke() {
    let question = chalk.cyan(jokes[0].question);
    let punchline = chalk.green(jokes[0].punchline);
    console.log(`${question} - ${punchline}`);
}

function getRandomJoke() {
    let randomNumber = Math.floor(Math.random() * jokes.length);
    let randomJokeQuestion = chalk.cyan(jokes[randomNumber].question);
    let randomJokePunchline = chalk.green(jokes[randomNumber].punchline);
    console.log(`${randomJokeQuestion} - ${randomJokePunchline}`);
}

function getMixedJoke() {
    let firstRandomNumber = Math.floor(Math.random() * jokes.length);
    let secondRandomNumber = Math.floor(Math.random() * jokes.length);
    let randomJokeQuestion = chalk.cyan(jokes[firstRandomNumber].question);
    let randomJokePunchline = chalk.green(jokes[secondRandomNumber].punchline);
    console.log(`${randomJokeQuestion} - ${randomJokePunchline}`);
}

function getJokesNumber() {
    var jokes = JSON.parse(localStorage.getItem('jokes'));
    console.log(jokes.length);
}

const confirmAnswerValidator = async (input) => {
    if (input < 1 || input > 10) {
       return 'Incorrect number';
    }
    return true;
 };

const choiceArray = ["Print full dad joke", "Print random dad joke", "Print chosen dad joke", "Print count of current amount of jokes in our 'database'", "Print mixed dad joke"];

inquirer
  .prompt([
    {
      name: "choices",
      type: "list",
      message: "What would you like to do?",
      choices: choiceArray
    },
  ])
  .then(answer => { 
    switch(answer.choices) {
        case "Print random dad joke":
            return getRandomJoke();
            break;
        case "Print chosen dad joke":
            inquirer
                .prompt([
                    {
                        name: "numberOfJokes",
                        type: "number",
                        message: "Enter a number between 1 and 10",
                        validate: confirmAnswerValidator
                    },
                ])
                .then(answer => {
                    if (!answer.numberOfJokes) {
                        console.log("That wasn't a number!");
                    } else {
                        for (i = 1; i <= jokes.length; i++) {
                            switch(answer.numberOfJokes) {
                                case i: 
                                    var question = chalk.cyan(jokes[i-1].question);
                                    var punchline = chalk.green(jokes[i-1].punchline);
                                    console.log(`${question} - ${punchline}`);
                                    break;
                            }
                        }
                    }
                })
            break;
        case "Print count of current amount of jokes in our 'database'":
            return getJokesNumber();
            break;
        case "Print mixed dad joke":
            return getMixedJoke();
            break;
        case "Print full dad joke":
            return getJoke();
    };
});


