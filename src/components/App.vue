<template>
	<div id="app">
		<quiz></quiz>
		<nav class="navbar fixed-bottom navbar-light bg-light">
			<a class="navbar-brand" href="#">Cvičebnice TŘOS</a>
			<button class="btn btn-warning" @click="resetSavedAnswers">
				Reset uložených odpovědí
			</button>
			<a class="btn btn-danger" href="mailto:xlukm014@studenti.czu.cz">Našel jsem chybu</a>
		</nav>
	</div>
</template>

<script lang="ts">
import Quiz from './Quiz.vue';

export default {
	name: 'App',
	components: {
		Quiz
	},
	methods: {
		resetSavedAnswers() {
			localStorage.removeItem('answeredQuestions');
			location.reload();
		}
	}
};
</script>

<style scoped></style>
