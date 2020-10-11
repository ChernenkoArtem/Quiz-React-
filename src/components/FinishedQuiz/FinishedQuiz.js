import React from "react"
import './FinishedQuiz.scss'

export default (props) => {
  let answerCount = 0
  return (
    <div className={'FinishedWrapper'}>
      <ul>
      {props.quiz.map((quizItem, index)=>{

        if(props.result[quizItem.id]=== 'trueAnswer'){
          answerCount++
        }
        return (
            <li className={props.result[quizItem.id]} key={index}>
              <strong>{index+ 1}</strong>
              {quizItem.question}
            </li>
          )
      })}
      {/*<ul>*/}
      {/*  <li className={'trueAswer'}>*/}
      {/*    <strong>1.</strong>*/}
      {/*    32132*/}
      {/*  </li>*/}
      {/*</ul>*/}
      </ul>
      <p>правильно {answerCount} из {props.quiz.length}</p>
      <button className={'btnRepeat'} onClick={props.returnQuiz}>Повторить</button>
    </div>
  )
}