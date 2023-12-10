import React from "react";
import classes from "./FinishedQuiz.module.css"
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";


const FinishedQuiz = (props) => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++;
        }

        return total;
    }, 0)

    return (
      <div className={classes.FinishedQuiz}>
          <ul>
              {
                  props.quiz.map((quizItem, index) => {
                      const cls = [
                        'fa'
                      ];

                      if (props.results[quizItem.id] === 'error') {
                          cls.push('fa-times');
                      } else {
                          cls.push('fa-check');
                      }

                      cls.push(classes[props.results[quizItem.id]]);

                      return (
                          <li key={index}>
                              <strong>{index + 1}.</strong>&nbsp;
                              {quizItem.question}
                              <i className={cls.join(' ')}></i>
                          </li>
                      );
                  })
              }
          </ul>
          <p>Correct answers {successCount} out of {props.quiz.length}</p>

          <div>
              <Button onClick={props.onRetry} type={'primary'}>Retry</Button>
              <Link to={'/'}>
                  <Button type={'success'}>To go tests list</Button>
              </Link>
          </div>
      </div>
    );
}

export default FinishedQuiz;
