import React from "react"
import './ActiveQuiz.scss'
import AnswerLists from "./AnswerLists/AnswerLists"

export default (props)=> (
  <div className={'ActiveQuiz'}>
    <p className={'Question'}>
      <span>
        <strong>{props.answerNumber}.</strong>&nbsp;
       { props.question }
      </span>
      <small> {props.answerNumber} из {props.quizLength}</small>
    </p>
    <ul>
      <AnswerLists
        answer={props.answer}
        onAnswerClick={props.onAnswerClick}
        state={props.state}
      />
    </ul>
  </div>

)

