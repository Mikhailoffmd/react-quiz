import React from "react";
import classes from "./AnswerItem.module.css";

const AnswerItem = props => {
  const classesList = [classes.AnswerItem];

  if (props.state) {
    classesList.push(classes[props.state]);
  }

  return (
    <li
      className={classesList.join(' ')}
      onClick={() => { props.onAnswerClick(props.answer.id); }}
    >
      { props.answer.text }
    </li>
  )
}

export default AnswerItem;
