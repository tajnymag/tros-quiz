const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const filePath = path.resolve(__dirname, process.argv[2]);
const questions = fs.readFileSync(filePath, { encoding: 'utf8' }).split('\n');
const shouldWrite = ['-w', '--write'].includes(process.argv[3]);

function toBoolean(word) {
	return ['ANO', 'TRUE', '1', 'JOP', 'A', 'T'].includes(
		String(word)
			.toUpperCase()
			.trim()
	);
}

function splitLine(line) {
	const [message, answer] = line.split(/\.(?=[^\.]+$)/);

	return { message, answer };
}

function parseAndFixLine(line) {
	let { message, answer } = splitLine(line);

	message += '.';
	answer = toBoolean(answer);

	return { message, answer };
}

questions
	.map(el => el.trim())
	.filter(el => el)
	.forEach(line => {
		const { message, answer } = parseAndFixLine(line);

		if (shouldWrite) {
			execSync(`node ${__dirname + "/dataset.js"} add ${JSON.stringify(message)} ${answer}`);
			console.log(`node ${__dirname + "/dataset.js"} add ${JSON.stringify(message)} ${answer}`);
		} else {
			console.log(JSON.stringify(message), answer);
		}
	});
