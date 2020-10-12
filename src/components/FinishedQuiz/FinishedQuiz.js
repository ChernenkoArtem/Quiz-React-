import React from "react"
import {Link} from "react-router-dom"
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
      </ul>
      <p>правильно {answerCount} из {props.quiz.length}</p>
      <button className={'btnRepeat'} onClick={props.returnQuiz}>Повторить</button>
      <Link to={'/'}>
        <button style={{padding : '10px 20px',
          fontSize: '17px',
          background: 'green',
          color: '#fff',
          cursor: 'pointer',
          marginLeft: '40px'}}
        >Список тестов</button>
      </Link>
    </div>
  )
}