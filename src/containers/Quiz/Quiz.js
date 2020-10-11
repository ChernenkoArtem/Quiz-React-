import React, {Component} from "react"
import ActiveQuiz from "../../components/ActivQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"
import './Quiz.scss'


export default class Quiz extends Component{
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz:[{
      question: 'Какого цвета набо?',
      rightAnswer: 1,
      id: 1,
      answer: [
        {text: 'синий', id: 1},
        {text: 'красный', id: 2},
        {text: 'зелёный', id: 3},
        {text: 'черный', id: 4}
      ]
    },
      {
        question: 'Кто такой Эрик Морандыч?',
        rightAnswer: 2,
        id: 2,
        answer: [
          {text: 'герой', id: 1},
          {text: 'друг вжилинка', id: 2},
          {text: 'бухарь', id: 3},
          {text: '323', id: 4}
        ]
      }]
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState){
      const key = Object.keys(this.state.answerState)[0]
      console.log(key)
      if (this.state.answerState[key]=== 'success'){
        return
      }
    }
    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswer === answerId){
      console.log(results)
      if (!results[answerId]){
        results[this.state.quiz[this.state.activeQuestion].id] = 'trueAnswer'
      }
      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })
      const timeout = window.setTimeout(()=>{

        if(this.isQuizFinish()){
            this.setState({
              isFinished: true
            })
        }else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      },1000)

    }else {
      results[this.state.quiz[this.state.activeQuestion].id] = 'falseAnswer'
      this.setState({
        answerState: {[answerId]: 'error'},
        results:  results
      })
    }

}
  isQuizFinish() {
    return this.state.activeQuestion+1  === this.state.quiz.length
  }
  returnQuiz =()=> {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    })
  }

  render() {
      return(
        <div className={'Quiz'}>
          <div className={'QuizWrapper'}>
            <h1>fgdgfdgfdgfdgfdgfd</h1>
            {
              this.state.isFinished
                ? <FinishedQuiz
                  result={this.state.results}
                  quiz={this.state.quiz}
                  returnQuiz ={this.returnQuiz}
                />
                : <ActiveQuiz
                  answer={this.state.quiz[this.state.activeQuestion].answer}
                  question={this.state.quiz[this.state.activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion+1}
                  state={this.state.answerState}
                />
            }
          </div>
        </div>
      )
  }
}