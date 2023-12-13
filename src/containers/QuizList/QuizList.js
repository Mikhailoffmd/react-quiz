import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from "../../components/UI/Loader/Loader";
import axios from "../../axios/axios";

export default class QuizList extends Component {

    state = {
        loading: true,
        quizez: [

        ]
    }

    renderQuizes() {
        return this.state.quizez.map((quiz) => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            //const response = await axios.get('https://react-quiz-b6e98-default-rtdb.firebaseio.com/quizes.json');
            const response = await axios.get('/quizes.json');
            const quizez = [];

            Object.keys(response.data).forEach((quizKey, index) => {
                quizez.push({
                    id: quizKey,
                    name: `Test ${index + 1}`
                });
            });

            this.setState({
                loading: false,
                quizez
            });
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of tests</h1>
                    {
                        this.state.loading ?
                            <Loader/> :
                            <ul>
                                { this.renderQuizes() }
                            </ul>
                    }
                </div>
            </div>
        )
    }
}
