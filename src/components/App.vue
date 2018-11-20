<template>
	<div id="app">
		<quiz></quiz>
		<nav class="navbar fixed-bottom navbar-light bg-light">
			<a class="navbar-brand" href="#">Cvičebnice TŘOS</a>
			<button class="btn btn-warning" @click="resetSavedAnswers">
				Reset uložených odpovědí
			</button>
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
