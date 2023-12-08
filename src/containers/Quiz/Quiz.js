import React, {Component} from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {}, // { [id]: 'success' 'error' }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error'}
        quiz: [
            {
                id: 1,
                question: 'Question 1',
                rigthAnswerId: 2,
                answers: [
                    {text: 'Option 1_1', id: 1},
                    {text: 'Option 1_2', id: 2},
                    {text: 'Option 1_3', id: 3},
                    {text: 'Option 1_4', id: 4},
                ]
            },
            {
                id: 2,
                question: 'Question 2',
                rigthAnswerId: 1,
                answers: [
                    {text: 'Option 2_1', id: 1},
                    {text: 'Option 2_2', id: 2},
                    {text: 'Option 2_3', id: 3},
                    {text: 'Option 2_4', id: 4},
                ]
            }
        ]
    };

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const activeQuestion = this.state.quiz[this.state.activeQuestion];
        const isAnsweredCorrectly = activeQuestion.rigthAnswerId === answerId;
        const results = this.state.results;

        if (isAnsweredCorrectly) {
            if (!results[activeQuestion.id]) {
                results[activeQuestion.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[activeQuestion.id] = 'error';

            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }

    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null
        });
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>
                    {
                        this.state.isFinished ?
                        <FinishedQuiz
                            quiz={this.state.quiz}
                            results={this.state.results}
                            onRetry={this.retryHandler}
                        /> :
                        <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;
