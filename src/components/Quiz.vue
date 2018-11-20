<template>
    <div class="card text-center">
        <div class="card-header">
            Otázka
        </div>
        <div class="card-body">
            <h5 class="card-title">{{currentQuestion.text}}</h5>

            <button class="btn btn-primary" v-if="!correct && !mistake && !unknown" @click="submitAnswer(true)">Ano</button>
            <button class="btn btn-primary" v-if="!correct && !mistake && !unknown" @click="submitAnswer(false)">Ne</button>
            <button class="btn btn-primary" @click="nextQuestion">Další</button>
        </div>
        <div class="card-footer text-muted alert"
             v-bind:class="{ 'alert-success': correct, 'alert-danger': mistake, 'alert-warning': unknown}">
            <span v-if="correct">Správně</span>
            <span v-else-if="mistake">Špatně</span>
            <span v-else-if="unknown">Spekulativní. Pokud jsi si jist(á) svou odpovědí, pošli mi mail na xlukm014@studenti.czu.cz</span>
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
                unknown: false,
                questionSet: QuestionSet
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
                const answeredCorrectly = (this.currentQuestion.answer === answer);

                if ([null, undefined].includes(this.currentQuestion.answer)) {
                    this.unknown = true;
                    this.questionSet.setAnswered(this.currentQuestion, false);
                    return;
                } else if (answeredCorrectly) {
                    this.correct = true;
                } else {
                    this.mistake = true;
                }
                this.questionSet.setAnswered(this.currentQuestion, answeredCorrectly);
            },
            nextQuestion() {
                this.currentQuestion = this.questionSet.getRandomUnanswered();
                this.resetCurrentAnswer();
            }
        }
    })
</script>
