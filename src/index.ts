import Vue from 'vue';
import Quiz from './components/Quiz.vue';

const app = new Vue({
    el: 'quiz-el',
    render: h => h(Quiz)
})