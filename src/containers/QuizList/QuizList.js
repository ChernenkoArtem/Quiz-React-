import React,{Component} from "react"
import {NavLink} from "react-router-dom"
import axios from "axios"
import "./QuizList.scss"

export default class QuizList extends Component {

  renderQuizes(){
    return [1,2,3].map((quizItem, index)=> {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + quizItem}>
            {quizItem}
          </NavLink>
        </li>
      )
    })
  }
  componentDidMount() {
    axios.get('https://quiz-9b8f2.firebaseio.com/quiz.json').then(respons=> {
      console.log(respons)
    })
  }

  render(){
        return(
          <div className={'QuizList'}>
            <h1>Quiz List</h1>
            <ul>
              {this.renderQuizes()}
            </ul>
          </div>
        )
    }
}