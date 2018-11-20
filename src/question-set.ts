import { randomInteger } from "./utiliy";
import listOfQuestions from "../static/otazky.json";

export interface Question {
  text: string;
  answer: boolean | null;
}

export class QuestionSet {
  private all: Question[];
  private answered: Map<number, boolean>;

  constructor() {
    this.all = listOfQuestions;
    this.answered = new Map();
  }

  public getRandomUnanswered(): Question {
    let randomIndex = randomInteger(0, this.all.length - 1);
    while (this.answered.get(randomIndex)) {
      randomIndex = randomInteger(0, this.all.length - 1);
    }

    return this.all[randomIndex];
  }

  public setAnswered(question: Question, correctly: boolean): void {
    this.answered.set(this.all.indexOf(question), correctly);
  }
}
