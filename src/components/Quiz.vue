<template>


    <div class="card text-center">
        <div class="card-header">
            Otázka
        </div>
        <div class="card-body">
            <h5 class="card-title">{{currentQuestion.text}}</h5>

            <button class="btn btn-primary" v-if="!correct && !mistake" @click="submitAnswer(true)">Ano</button>
            <button class="btn btn-primary" v-if="!correct && !mistake" @click="submitAnswer(false)">Ne</button>
            <button class="btn btn-primary" @click="nextQuestion">Další</button>
        </div>
        <div class="card-footer text-muted alert" v-bind:class="{ 'alert-success': correct, 'alert-danger': mistake}">
            <span v-if="correct">Správně</span>
            <span v-else-if="mistake">Špatně</span>
            <span v-else>Nezodpovězeno</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {QuestionSet, Question} from '../question-set.ts';

export default Vue.extend({
    data() {
        return {
            currentQuestion: {
                text: 'Načítám...',
                answer: null
            },
            correct: false,
            mistake: false,
            questionSet: QuestionSet
        }
    },
    mounted() {
        this.questionSet = new QuestionSet();
        this.currentQuestion = this.questionSet.getRandomUnanswered();
    },
    methods: {
        submitAnswer(answer: boolean) {
            const answeredCorrectly = (this.currentQuestion.answer === answer);

            if (answeredCorrectly) {
                this.correct = true;
                this.mistake = false;
            } else {
                this.correct = false;
                this.mistake = true;
            }
            this.questionSet.setAnswered(this.currentQuestion, answeredCorrectly);
        },
        nextQuestion() {
            this.currentQuestion = this.questionSet.getRandomUnanswered();
            this.correct = false;
            this.mistake = false;
        }
    }
})
</script>
