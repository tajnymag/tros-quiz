const fs = require('fs');
const questions = require('./static/otazky.json');

const preparedQuestions = [];

for (let question of questions) {
    let correctAnswer = null;
    if (question.answer.toUpperCase() === 'ANO') {
        correctAnswer = true;
    } else if (question.answer.toUpperCase() === 'NE') {
        correctAnswer = false;
    }

    preparedQuestions.push({
        text: question.question,
        answer: correctAnswer
    })
}

fs.writeFileSync(__dirname + '/static/otazky2.json', JSON.stringify(preparedQuestions));