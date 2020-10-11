import React from "react"
import './AnswerLists.scss'
import AnswerItem from "./AnswerItem/AnswerItem"

export default (props) => (
  <ul className={'AnswerLists'}>
    {props.answer.map((answer, index) =>{
      return (
        <AnswerItem answer={answer} key={index}
            onAnswerClick={props.onAnswerClick}
            state={props.state ? props.state[answer.id] : null}
        />
      )
    })}
  </ul>
)

