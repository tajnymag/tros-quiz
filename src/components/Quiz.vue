<template>
	<div class="card text-center">
		<div class="card-header">
			<div class="progress">
				<div
					class="progress-bar"
					role="progressbar"
					v-bind:style="{ width: progressPercent + '%' }"
					v-bind:aria-valuenow="progress.now"
					aria-valuemin="0"
					v-bind:aria-valuemax="progress.max"
				></div>
			</div>
		</div>
		<div class="card-body">
			<h5 class="card-title">{{ currentQuestion.text }}</h5>

			<button
				class="btn btn-primary"
				v-if="!correct && !mistake && !unknown"
				@click="submitAnswer(true);"
			>
				Ano
			</button>
			<button
				class="btn btn-primary"
				v-if="!correct && !mistake && !unknown"
				@click="submitAnswer(false);"
			>
				Ne
			</button>
			<button class="btn btn-primary" @click="nextQuestion">Další</button>
		</div>
		<div
			class="card-footer text-muted alert"
			v-bind:class="{
				'alert-success': correct,
				'alert-danger': mistake,
				'alert-warning': unknown
			}"
		>
			<span v-if="correct">Správně</span> <span v-else-if="mistake">Špatně</span>
			<span v-else-if="unknown"
				>Spekulativní. Pokud jsi si jist(á) svou odpovědí, pošli mi mail na
				xlukm014@studenti.czu.cz</span
			>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { QuestionSet, Question } from '../question-set.ts';

export default Vue.extend({
	data() {
		return {
			currentQuestion: {
				text: 'Načítám...',
				answer: null
			},
			correct: false,
			mistake: false,
			unknown: false,
			questionSet: QuestionSet,
			progress: { now: 0, max: 0 }
		};
	},
	computed: {
		progressPercent() {
			return (this.progress.now / this.progress.max) * 100;
		}
	},
	mounted() {
		this.questionSet = new QuestionSet();
		this.currentQuestion = this.questionSet.getRandomUnanswered();
	},
	methods: {
		resetCurrentAnswer() {
			this.correct = false;
			this.mistake = false;
			this.unknown = false;
		},
		submitAnswer(answer: boolean) {
			this.resetCurrentAnswer();
			const answeredCorrectly = this.currentQuestion.answer === answer;

			if ([null, undefined].includes(this.currentQuestion.answer)) {
				this.unknown = true;
			} else if (answeredCorrectly) {
				this.correct = true;
			} else {
				this.mistake = true;
			}
			this.questionSet.setAnswered(
				this.currentQuestion,
				this.unknown ? false : answeredCorrectly
			);
			this.updateProgress();
		},
		updateProgress() {
			this.progress = this.questionSet.getProgress();
		},
		nextQuestion() {
			this.currentQuestion = this.questionSet.getRandomUnanswered();
			this.resetCurrentAnswer();
		}
	}
});
</script>
