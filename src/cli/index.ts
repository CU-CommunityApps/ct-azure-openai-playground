#!/usr/bin/env -S npx ts-node --esm

import { exec } from 'node:child_process';
import { oneLineTrim } from 'common-tags';
import boxen from 'boxen';
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import ora from 'ora';
import terminalImage from 'terminal-image';

import {
  execNpmCommand,
  showError,
  showGoodbye,
  showPrompt,
} from '../lib/helpers.js';

// set title text and style
const programTitle = 'Azure OpenAI Playground';
const titleStyle = chalk.bold.blue;

// output title
console.log(titleStyle(figlet.textSync(programTitle)));

// define demos available to run
const demos = [
  {
    name: 'Text to Emoji',
    npmCommand: 'text-completion-rest-demo',
  },
  {
    name: 'Image Generation',
    npmCommand: 'image-generation-demo',
    allowsInput: true,
  },
  {
    name: 'Exit',
  },
];

// start program by prompting user to select a demo
const startChoice = await inquirer
  .prompt({
    type: 'list',
    name: 'answer',
    message: 'What demo would you like to run?',
    choices: demos.map((demo) => demo.name),
  })
  .then((response) => response.answer.toLowerCase())
  .catch((err: unknown) => 'exit');

switch (startChoice) {
  case 'text to emoji':
    const defaultPrompt = oneLineTrim`
      Cornell is a private, Ivy League university and the land-grant university for New York state.
      Cornell’s mission is to discover, preserve and disseminate knowledge, to educate the next
      generation of global citizens, and to promote a culture of broad inquiry throughout and beyond
      the Cornell community. Cornell also aims, through public service, to enhance the lives and
      livelihoods of students, the people of New York and others around the world.
    `;

    const emojiGenerationPrompt = await inquirer
      .prompt({
        type: 'input',
        name: 'answer',
        message:
          'Submit the text that you would like to analyze and get emojis for',
        default: defaultPrompt,
      })
      .then((response) => response.answer)
      .catch((err: unknown) => {
        console.log(showError(err));
        console.log(showGoodbye());
      });

    // console.log(showPrompt(emojiGenerationPrompt));

    const emojiSpinner = ora('Generating JSON').start();
    execNpmCommand({
      command: 'text-completion-rest-demo',
      flags: `--prompt "${emojiGenerationPrompt}"`,
      callback: (stdout: string) => {
        console.log(JSON.parse(stdout));
      },
      spinnerRef: emojiSpinner,
    });

    break;
  case 'image generation':
    const imageGenerationPrompt = await inquirer
      .prompt({
        type: 'input',
        name: 'answer',
        message: 'Describe the image you would like to generate',
        default:
          'Detailed image of a clocktower with a pumpkin on the very top of its spire',
      })
      .then((response) => response.answer)
      .catch((err: unknown) => {
        console.log(showError(err));
        console.log(showGoodbye());
      });

    const imageSpinner = ora(
      'Generating image (this can take a little while)',
    ).start();

    const imageGenCallback = async (stdout: string) => {
      console.log(stdout);
      const imagePath = stdout.toString().split("'")[1].replace("'", '');
      const imagePreview = await terminalImage.file(imagePath, {
        width: '50%',
        height: '50%',
        preserveAspectRatio: true,
      });
      console.log(imagePreview);
    };

    execNpmCommand({
      command: 'image-generation-demo',
      flags: `--prompt "${imageGenerationPrompt}" --display false`,
      callback: imageGenCallback,
      spinnerRef: imageSpinner,
    });

    break;
  case 'exit':
    console.log(showGoodbye());

    break;
}
