import { randomInteger, serializeMap } from './utiliy';
import listOfQuestions from '../data/otazky.json';

export interface Question {
	text: string;
	answer: boolean | null;
}

export class QuestionSet {
	private all: Question[];
	private answered: Map<number, boolean>;

	constructor(answered: Map<number, boolean> = new Map()) {
		this.all = listOfQuestions;
		this.answered = answered;
	}

	public getRandomUnanswered(): Question {
		let randomIndex = randomInteger(0, this.all.length - 1);
		while (this.answered.get(randomIndex)) {
			randomIndex = randomInteger(0, this.all.length - 1);
		}

		return this.all[randomIndex];
	}

	public getProgress(): { now: number; max: number } {
		return {
			now: this.answered.size,
			max: this.all.length
		};
	}

	public getSerializedAnswered(): string {
		return serializeMap(this.answered);
	}

	public setAnswered(question: Question, correctly: boolean): void {
		this.answered.set(this.all.indexOf(question), correctly);
	}

	public toCSV(): string {
		let output = '';

		this.all.forEach((question) => {
			const text = JSON.stringify(question.text);
			const answer = (question.answer === true) ? 'ANO' : (question.answer === false) ? 'NE' : 'NEVÍM';

			output +=  `${text}, ${answer}\n`;
		});

		return output;
	}
}
