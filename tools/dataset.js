#!/usr/bin/env node

const fs = require('fs');
const exec = require('child_process').exec;
const questionsFile = require('../data/otazky.json');

const OUTPUT_FILE = __dirname + '/data/otazky.json';
const args = process.argv.splice(2);

function indexOfQuestion(text, answer, questions = questionsFile) {
	return questions.findIndex(q => q.text === text);
}

function addQuestion(text, answer, questions = questionsFile) {
	const foundIndex = indexOfQuestion(text, answer, questions);

	if (foundIndex >= 0) {
		questions[foundIndex].answer = answer;
	} else {
		questions.push({
			text,
			answer
		});
	}
}

function saveQuestions(questions) {
	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(questions));
}

function toBoolean(value) {
	return String(value).toLowerCase() === 'true';
}

function reformat() {
	exec('yarn run format:data');
}

if (args[0] === 'add') {
	if (args.length < 3) {
		console.error('Zadejte otázku i její pravdivost!');
		process.exit(1);
	}

	addQuestion(args[1], toBoolean(args[2]));
	saveQuestions(questionsFile);
	reformat();
} else {
	console.error('Zadejte příkaz!');
}
