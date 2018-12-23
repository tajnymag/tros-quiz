<template>
	<div id="app">
		<quiz></quiz>
		<nav class="navbar fixed-bottom navbar-light bg-light">
			<a class="navbar-brand" href="#">Cvičebnice TŘOS</a>
			<a class="btn btn-danger" href="mailto:xlukm014@studenti.czu.cz">Našel jsem chybu</a>
			<b-dropdown text="Nástroje">
				<b-dropdown-item @click="resetSavedAnswers">
					Reset uložených odpovědí
				</b-dropdown-item>
				<b-dropdown-item @click="downloadCSVFile">Export otázek do .tsv</b-dropdown-item>
			</b-dropdown>
		</nav>
	</div>
</template>

<script lang="ts">
import Quiz from './Quiz.vue';
import { QuestionSet } from '../question-set';
import FileSave from 'file-saver';

export default {
	name: 'App',
	components: {
		Quiz
	},
	data() {
		return {
			tsvDataUrl: ''
		}
	},
	methods: {
		resetSavedAnswers(): void {
			localStorage.removeItem('answeredQuestions');
			location.reload();
		},
		downloadCSVFile() {
			const tmpQuestionSet = new QuestionSet();
			const blob = new Blob([tmpQuestionSet.toCSV()], {
				type: 'text/plain;charset=utf-8'
			});
			FileSave.saveAs(blob, 'otazky.csv');
		}
	}
};
</script>

<style scoped></style>
